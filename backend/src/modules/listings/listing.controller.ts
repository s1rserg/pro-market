import { NextFunction, Request, Response } from 'express';
import { ListingService } from './listing.service';
import { BaseController } from '~/libs/core/base-controller';
import { createListingRequestSchema } from '~/libs/common/common';

class ListingController extends BaseController {
  private listingService = new ListingService();

  public create = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: Request, res: Response) => {
        const listing = await this.listingService.create(req.body);
        this.sendResponse(res, listing, 201);
      },
      createListingRequestSchema
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
      const listings = await this.listingService.getAll();
      this.sendResponse(res, listings, 200);
    });

  public update = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const listing = await this.listingService.update(req.params.id, req.body);
      if (!listing) {
        this.sendResponse(res, { error: 'Skill not found' }, 404);
        return;
      }
      this.sendResponse(res, listing, 200);
    });

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
