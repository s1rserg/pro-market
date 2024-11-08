import { Router } from 'express';
import { ListingController } from './listing.controller';

const router = Router();

const listingController = new ListingController();

router.post('/skills', listingController.create);
router.get('/skills/:id', listingController.getById);
router.get('/skills', listingController.getAll);
router.patch('/skills/:id', listingController.update);
router.delete('/skills/:id', listingController.delete);

export default router;
