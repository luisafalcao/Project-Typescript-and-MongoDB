import { NextFunction, Response, Request } from 'express';
import UnauthorizedException from '../exceptions/unauthorized.exception';

class AuthService {
  private checkToken (req: Request, res: Response, next: NextFunction): void {
    const apiKey = req.headers['api-key'];
    if (apiKey) {
      if (apiKey === 'ChaveSuperSecreta') {
        next();
        return;
      }
    }
    throw new UnauthorizedException();
  }

  public static protect () {
    const authService = new AuthService();
    return authService.checkToken.bind(authService);
  }
}

AuthService.protect();

export default AuthService;
