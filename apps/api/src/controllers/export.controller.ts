import { Request, Response } from 'express';
import { prisma } from '../config/db.js';
import { z } from 'zod';

const createExportSchema = z.object({
  format: z.enum(['JPG', 'PNG', 'PDF']),
  preset: z.string().default('8x10'),
  scaleFactor: z.number().default(1.0),
  imageDataUrl: z.string().optional(), // In case client uploads rendered base64 for server storage
});

export async function createExportJob(req: Request, res: Response) {
  const projectId = String(req.params.id);
  const userId = req.user?.id;
  const body = createExportSchema.parse(req.body);

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  const exportJob = await prisma.exportJob.create({
    data: {
      projectId,
      userId: userId || null,
      format: body.format,
      preset: body.preset,
      scaleFactor: body.scaleFactor,
      status: 'COMPLETED',
      downloadUrl: body.imageDataUrl || null,
    },
  });

  return res.status(201).json({
    success: true,
    data: exportJob,
  });
}

export async function getExportJob(req: Request, res: Response) {
  const id = String(req.params.id);
  const job = await prisma.exportJob.findUnique({
    where: { id },
  });

  if (!job) {
    return res.status(404).json({ success: false, error: 'Export job not found' });
  }

  return res.json({ success: true, data: job });
}
