type AsyncRouteHandler = (...args: any[]) => Promise<any> | any;

export const asyncHandler = (fn: AsyncRouteHandler) => {
  return async function asyncHandled(...args: any[]) {
    const next = args[2];
    try {
      return await fn(...args);
    } catch (error) {
      return next(error);
    }
  };
};

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
