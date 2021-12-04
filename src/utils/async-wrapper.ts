import { Request, Response, NextFunction } from 'express';

export function asyncWrapper(fn: Function) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await fn(request, response, next);
    } catch (error) {
      next(error);
    }
  };
}
