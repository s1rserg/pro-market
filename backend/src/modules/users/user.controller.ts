import { AuthRequest } from '~/libs/middleware/auth.middleware';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '~/libs/core/base-controller';
import { userService } from './user.service';
import { signInRequestSchema, signUpRequestSchema } from 'shared/src';

class UserController extends BaseController {
  public signUp = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        const { user, jwtToken } = await userService.createUser(
          name,
          email,
          password
        );
        this.sendResponse(res, { user, token: jwtToken }, 201);
      },
      signUpRequestSchema
    );

  public signIn = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const { user, jwtToken } = await userService.signIn(email, password);
        this.sendResponse(res, { user, token: jwtToken }, 200);
      },
      signInRequestSchema
    );

  public getAuthenticatedUser = (
    req: Request,
    res: Response,
    next: NextFunction
  ) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: AuthRequest, res: Response) => {
        const userId = req.user?.id as string;
        const user = await userService.getUserById(userId);
        this.sendResponse(res, { user }, 200);
      }
    );
}

export const userController = new UserController();
