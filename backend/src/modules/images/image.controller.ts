import { NextFunction, Request, Response } from 'express';
import { ImageService } from './image.service';
import fs from 'fs';
import { BaseController } from '~/libs/core/base-controller';

const imageService = new ImageService();

class ImageController extends BaseController {
  public upload = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      if (!req.file) {
        this.sendResponse(res, { error: 'File not provided' }, 400);
        return;
      }

      const image = await imageService.uploadImage(
        req.file.path,
        req.file.originalname
      );

      fs.unlinkSync(req.file.path);
      this.sendResponse(res, { image }, 201);
    });

  public getImageById = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const image = await imageService.getImageById(req.params.id);
      if (!image) {
        this.sendResponse(res, { error: 'Image not found' }, 404);
        return;
      }
      res.json(image);
    });
}

export { ImageController };