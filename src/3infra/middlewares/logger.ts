/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

type MiddlewareTypeExpress = (req: Request, res: Response, next: NextFunction) => void;

class Logger {
  public static init (): MiddlewareTypeExpress {
    return (req: Request, res: Response, next: NextFunction) => {
      const dateTime = new Date().toISOString();
      console.log(`${dateTime} Método: ${req.method}, URL: ${req.url}`);
      next();
    };
  }
}

export default Logger;
