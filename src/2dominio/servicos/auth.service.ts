import { NextFunction, Response, Request } from 'express';
import UnauthorizedException from '../exceptions/unauthorized.exception';
import dotenv from 'dotenv';

dotenv.config();

class AuthService {
  private checkToken(req: Request, res: Response, next: NextFunction): void {
    const apiKey = req.headers['api-key'];
    if (apiKey) {
      if (apiKey === process.env.API_KEY) {
        next();
        return;
      }
    }
    throw new UnauthorizedException();
  }

  public static protect() {
    const authService = new AuthService();
    return authService.checkToken.bind(authService);
  }
}

AuthService.protect();

export default AuthService;
