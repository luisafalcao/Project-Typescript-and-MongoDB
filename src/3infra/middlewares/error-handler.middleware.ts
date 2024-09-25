import { NextFunction, Request, Response } from 'express';
import CustomError from '../../2dominio/exceptions/custom-error.error';

class ErrorHandler {
  public handleError (
    error: Error,
    req: Request, res: Response, next: NextFunction) {
    let status = 500;
    const message = error.message;
    console.error(`[Erro] status: ${status}, Message: ${message}`);

    if (error instanceof CustomError) {
      status = error.statusCode;
      res.status(status).json({
        status: error.statusCode,
        message
      });
    }

    res.status(status).json({
      status,
      message
    });
  }

  public static init ():
  (error: Error, req: Request, res: Response, next: NextFunction) => void {
    const errorHanlder = new ErrorHandler();
    return errorHanlder.handleError.bind(errorHanlder);
  }
}
export default ErrorHandler;
