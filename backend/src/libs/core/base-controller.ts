/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export abstract class BaseController {
  protected async handleRequest(
    req: Request,
    res: Response,
    next: NextFunction,
    handler: (req: Request, res: Response) => Promise<void>,
    schema?: ZodSchema
  ) {
    try {
      if (schema) {
        req.body = this.validate(schema, req.body);
      }

      await handler(req, res);
    } catch (error) {
      next(error);
    }
  }

  protected validate<T>(schema: ZodSchema<T>, data: unknown): T {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw { status: 400, errors: error.errors };
      }
      throw error;
    }
  }

  protected sendResponse(res: Response, data: any, statusCode: number = 200) {
    res.status(statusCode).json(data);
  }
}
