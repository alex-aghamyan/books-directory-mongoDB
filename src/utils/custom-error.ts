export class CustomError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }
}

export function createCustomError(
  message: string,
  statusCode: number
): CustomError {
  return new CustomError(message, statusCode);
}
