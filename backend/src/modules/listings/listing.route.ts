import { Router } from 'express';
import { ListingController } from './listing.controller';
import authMiddleware from '~/libs/middleware/auth.middleware';

const router = Router();

const listingController = new ListingController();

router.post('/', authMiddleware, listingController.create);
router.get('/:id', authMiddleware, listingController.getById);
router.get('/', authMiddleware, listingController.getAll);
router.patch('/:id', authMiddleware, listingController.update);
router.delete('/:id', authMiddleware, listingController.delete);

export default router;
