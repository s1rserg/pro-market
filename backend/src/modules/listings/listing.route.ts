import { Router } from 'express';
import { ListingController } from './listing.controller';
import authMiddleware from '~/libs/middleware/auth.middleware';
import multer from 'multer';

const router = Router();

const listingController = new ListingController();

const upload = multer({ dest: 'uploads/' });

router.post(
  '/',
  authMiddleware,
  upload.array('images', 10),
  listingController.create
);
router.get('/:id', authMiddleware, listingController.getById);
router.get('/', authMiddleware, listingController.getAll);
router.patch(
  '/:id',
  authMiddleware,
  upload.array('images', 10),
  listingController.update
);
router.delete('/:id', authMiddleware, listingController.delete);

export default router;
