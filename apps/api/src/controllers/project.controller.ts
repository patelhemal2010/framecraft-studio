import { Request, Response } from 'express';
import { prisma } from '../config/db.js';
import { ProjectDataSchema } from '@framecraft/shared';

export async function listProjects(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    return res.json({ success: true, data: [] });
  }

  const projects = await prisma.project.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      category: true,
      templateId: true,
      canvasWidth: true,
      canvasHeight: true,
      aspectRatio: true,
      thumbnailUrl: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.json({ success: true, data: projects });
}

export async function createProject(req: Request, res: Response) {
  const userId = req.user?.id;
  const projectData = ProjectDataSchema.parse(req.body);

  const project = await prisma.project.create({
    data: {
      id: projectData.id,
      userId: userId || null,
      title: projectData.title,
      templateId: projectData.templateId,
      category: projectData.category,
      canvasWidth: projectData.canvasWidth,
      canvasHeight: projectData.canvasHeight,
      aspectRatio: projectData.aspectRatio,
      designJson: projectData as any,
      thumbnailUrl: projectData.thumbnailUrl,
    },
  });

  return res.status(201).json({
    success: true,
    data: project.designJson,
  });
}

export async function getProjectById(req: Request, res: Response) {
  const id = String(req.params.id);
  const userId = req.user?.id;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    return res.status(404).json({
      success: false,
      error: 'Project not found',
    });
  }

  // Security: Check ownership if assigned to a user and not public
  if (project.userId && project.userId !== userId && !project.isPublic) {
    return res.status(403).json({
      success: false,
      error: 'You do not have permission to view this project',
    });
  }

  return res.json({
    success: true,
    data: project.designJson,
  });
}

export async function updateProject(req: Request, res: Response) {
  const id = String(req.params.id);
  const userId = req.user?.id;

  const existing = await prisma.project.findUnique({
    where: { id },
  });

  if (!existing) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  if (existing.userId && existing.userId !== userId) {
    return res.status(403).json({
      success: false,
      error: 'You do not have permission to modify this project',
    });
  }

  const { title, designJson, thumbnailUrl } = req.body;

  const updated = await prisma.project.update({
    where: { id },
    data: {
      title: title || existing.title,
      designJson: designJson || existing.designJson,
      thumbnailUrl: thumbnailUrl !== undefined ? thumbnailUrl : existing.thumbnailUrl,
    },
  });

  return res.json({
    success: true,
    data: updated.designJson,
  });
}

export async function deleteProject(req: Request, res: Response) {
  const id = String(req.params.id);
  const userId = req.user?.id;

  const existing = await prisma.project.findUnique({
    where: { id },
  });

  if (!existing) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  if (existing.userId && existing.userId !== userId) {
    return res.status(403).json({
      success: false,
      error: 'You do not have permission to delete this project',
    });
  }

  await prisma.project.delete({
    where: { id },
  });

  return res.json({ success: true, message: 'Project deleted' });
}

export async function duplicateProject(req: Request, res: Response) {
  const id = String(req.params.id);
  const userId = req.user?.id;

  const existing = await prisma.project.findUnique({
    where: { id },
  });

  if (!existing) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  const newDesignJson: any = {
    ...(existing.designJson as any),
    id: crypto.randomUUID(),
    title: `${existing.title} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const duplicated = await prisma.project.create({
    data: {
      id: newDesignJson.id,
      userId: userId || null,
      title: newDesignJson.title,
      templateId: existing.templateId,
      category: existing.category,
      canvasWidth: existing.canvasWidth,
      canvasHeight: existing.canvasHeight,
      aspectRatio: existing.aspectRatio,
      designJson: newDesignJson,
      thumbnailUrl: existing.thumbnailUrl,
    },
  });

  return res.status(201).json({
    success: true,
    data: duplicated.designJson,
  });
}
