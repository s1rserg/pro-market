import { NextFunction, Request, Response } from 'express';
import { BaseController } from '~/libs/core/base-controller';
import { AttributeService } from './attribute.service';

class AttributeController extends BaseController {
  private attributeService = new AttributeService();

  public getAllCategories = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const categories = await this.attributeService.getAllCategories();
      this.sendResponse(res, categories, 200);
    });

  public getAllSubcategories = (
    req: Request,
    res: Response,
    next: NextFunction
  ) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const subcategories = await this.attributeService.getAllSubcategories();
      this.sendResponse(res, subcategories, 200);
    });

  public getAllFilters = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const filters = await this.attributeService.getAllFilters();
      this.sendResponse(res, filters, 200);
    });
}

export { AttributeController };
