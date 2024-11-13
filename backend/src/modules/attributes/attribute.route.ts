import { Router } from 'express';
import { AttributeController } from './attribute.controller';

const router = Router();

const attributeController = new AttributeController();

router.get('/categories', attributeController.getAllCategories);
router.get('/subcategories', attributeController.getAllSubcategories);
router.get('/filters', attributeController.getAllFilters);

export default router;
