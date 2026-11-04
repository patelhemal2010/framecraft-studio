import { Router } from 'express';
import { listTemplates, getTemplateBySlug, getCategories } from '../controllers/template.controller.js';

const router = Router();

router.get('/', listTemplates);
router.get('/categories', getCategories);
router.get('/:slug', getTemplateBySlug);

export default router;
