import { Router } from 'express';
import {
  uploadMiddleware,
  uploadAsset,
  getAsset,
  deleteAsset,
} from '../controllers/asset.controller.js';
import { optionalAuth, requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/upload', optionalAuth, uploadMiddleware.single('image'), uploadAsset);
router.get('/:id', getAsset);
router.delete('/:id', requireAuth, deleteAsset);

export default router;
