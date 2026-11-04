import { Router } from 'express';
import { createExportJob, getExportJob } from '../controllers/export.controller.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

router.post('/projects/:id/exports', optionalAuth, createExportJob);
router.get('/:id', getExportJob);

export default router;
