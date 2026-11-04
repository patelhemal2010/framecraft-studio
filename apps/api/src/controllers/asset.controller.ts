import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import sharp from 'sharp';
import { prisma } from '../config/db.js';
import { env } from '../config/env.js';

// Setup uploads directory
const uploadRoot = path.resolve(process.cwd(), env.UPLOAD_DIR);
const thumbnailsDir = path.join(uploadRoot, 'thumbnails');

if (!fs.existsSync(uploadRoot)) {
  fs.mkdirSync(uploadRoot, { recursive: true });
}
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

// Multer storage with randomized UUID file names
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadRoot);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const uniqueName = `${crypto.randomUUID()}${ext}`;
    cb(null, uniqueName);
  },
});

export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format. Please upload JPG, PNG, or WebP images.'));
    }
  },
});

export async function uploadAsset(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No image file uploaded' });
  }

  const file = req.file;
  const userId = req.user?.id;

  try {
    // Sharp metadata & thumbnail generation
    const metadata = await sharp(file.path).metadata();
    const thumbFilename = `thumb-${file.filename}`;
    const thumbPath = path.join(thumbnailsDir, thumbFilename);

    await sharp(file.path)
      .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(thumbPath);

    const publicUrl = `/uploads/${file.filename}`;
    const thumbnailUrl = `/uploads/thumbnails/${thumbFilename}`;

    const asset = await prisma.uploadedAsset.create({
      data: {
        userId: userId || null,
        originalName: file.originalname,
        mimeType: file.mimetype,
        sizeBytes: file.size,
        width: metadata.width || 0,
        height: metadata.height || 0,
        storagePath: file.path,
        publicUrl,
        thumbnailUrl,
      },
    });

    return res.status(201).json({
      success: true,
      data: asset,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: `Failed to process image: ${err.message}`,
    });
  }
}

export async function getAsset(req: Request, res: Response) {
  const id = String(req.params.id);
  const asset = await prisma.uploadedAsset.findUnique({
    where: { id },
  });

  if (!asset) {
    return res.status(404).json({ success: false, error: 'Asset not found' });
  }

  return res.json({ success: true, data: asset });
}

export async function deleteAsset(req: Request, res: Response) {
  const id = String(req.params.id);
  const userId = req.user?.id;

  const asset = await prisma.uploadedAsset.findUnique({
    where: { id },
  });

  if (!asset) {
    return res.status(404).json({ success: false, error: 'Asset not found' });
  }

  if (asset.userId && asset.userId !== userId) {
    return res.status(403).json({ success: false, error: 'Permission denied' });
  }

  // Delete local files
  if (fs.existsSync(asset.storagePath)) {
    fs.unlinkSync(asset.storagePath);
  }

  await prisma.uploadedAsset.delete({
    where: { id },
  });

  return res.json({ success: true, message: 'Asset deleted' });
}
