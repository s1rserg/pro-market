import { Router } from 'express';
import multer from 'multer';
import { ImageController } from './image.controller';

const router = Router();
const imageController = new ImageController();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), (req, res, next) =>
  imageController.upload(req, res, next)
);
router.get('/:id', (req, res, next) => imageController.getById(req, res, next));

export default router;
