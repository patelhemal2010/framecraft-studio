import { Router } from 'express';
import {
  listProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  duplicateProject,
} from '../controllers/project.controller.js';
import { optionalAuth, requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', optionalAuth, listProjects);
router.post('/', optionalAuth, createProject);
router.get('/:id', optionalAuth, getProjectById);
router.patch('/:id', optionalAuth, updateProject);
router.delete('/:id', requireAuth, deleteProject);
router.post('/:id/duplicate', optionalAuth, duplicateProject);

export default router;
