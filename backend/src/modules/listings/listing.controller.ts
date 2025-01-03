import { NextFunction, Request, Response } from 'express';
import { ListingService } from './listing.service';
import { BaseController } from '~/libs/core/base-controller';
import {
  GetAllRequestDto,
  ListingCreateRequestSchema,
} from '~/libs/common/common';
import { AuthRequest } from '~/libs/middleware/auth.middleware';
import { ImageService } from '../images/image.service';
import { Types } from 'mongoose';

class ListingController extends BaseController {
  private listingService = new ListingService();
  private imageService = new ImageService();

  public create = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: AuthRequest, res: Response) => {
        const userId = req.user?.id as string;
        const files = req.files as Express.Multer.File[];
        const imageUrls = await Promise.all(
          files.map((file) =>
            this.imageService.upload(file.path, file.originalname)
          )
        );
        const filters = JSON.parse(req.body.filters);
        const listingData = { ...req.body, userId, images: imageUrls, filters };
        const listing = await this.listingService.create(
          listingData,
          userId as unknown as Types.ObjectId
        );
        this.sendResponse(res, listing, 201);
      },
      ListingCreateRequestSchema
    );

  public getById = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const listing = await this.listingService.getById(req.params.id);
      if (!listing) {
        this.sendResponse(res, { error: 'Skill not found' }, 404);
        return;
      }
      this.sendResponse(res, listing, 200);
    });

  public getAll = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const {
        page = 1,
        pageSize = 10,
        name,
      } = req.query as unknown as GetAllRequestDto;

      const listings = await this.listingService.getAll({
        page,
        pageSize,
        name,
      });
      this.sendResponse(res, listings, 200);
    });

  public update = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: AuthRequest, res: Response) => {
        const userId = req.user?.id as string;
        const listingId = req.params.id;

        const checkListing = await this.listingService.getById(listingId);
        if (userId !== checkListing?.creator.toString()) {
          this.sendResponse(res, { error: 'Update forbidden' }, 403);
          return;
        }

        const files = req.files as Express.Multer.File[];
        const imageUrls = await Promise.all(
          files.map(async (file) => {
            return this.imageService.upload(file.path, file.originalname);
          })
        );

        const existingImages = Array.isArray(req.body.images)
          ? req.body.images
          : [];
        let [, validImageStrings] = existingImages.filter(
          (image: unknown): image is string => typeof image === 'string'
        );
        if (typeof validImageStrings === 'string') {
          validImageStrings = [validImageStrings];
        }
        const allImages = [...imageUrls, ...validImageStrings];

        const filters = JSON.parse(req.body.filters);
        const listingData = { ...req.body, userId, images: allImages, filters };

        const listing = await this.listingService.update(
          req.params.id,
          listingData
        );

        if (!listing) {
          this.sendResponse(res, { error: 'Skill not found' }, 404);
          return;
        }
        this.sendResponse(res, listing, 200);
      }
    );

  public delete = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const listing = await this.listingService.delete(req.params.id);
      if (!listing) {
        this.sendResponse(res, { error: 'Skill not found' }, 404);
        return;
      }
      this.sendResponse(res, true, 200);
    });
}

export { ListingController };
