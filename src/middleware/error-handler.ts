import { Request, Response } from 'express';
import { CustomError } from '../utils/custom-error.js';

export function errorHandlerMiddleware(
  error: Error,
  request: Request,
  response: Response
) {
  if (error instanceof CustomError) {
    return response.status(error.statusCode).send(error.message);
  }

  return response.status(500).send('Something went wrong, please try again.');
}
