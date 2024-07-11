import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  // async userAuthentication(token, currentRequest) {
  //   if (!token) throw new Error('Restricted access');

  //   const decoded = this.jwtService.decode(token);
  //   if (!Object.keys(decoded).length) throw new Error('Invalid token.');

  //   const paramsUser = {
  //     selects: ['id', 'password', 'isActive'],
  //     filters: { email: decoded.email },
  //   };
  //   const [user] = await selectUser(paramsUser);

  //   if (!user) throw new Error('Token doesn`t exists.');
  //   if (!user.isActive) throw new Error('Inactive token.');
  //   if (user.password !== decoded.password)
  //     throw new Error('Invalid token data.');

  //   const paramsUserFeatures = {
  //     selects: ['id', 'name', 'isActive'],
  //     filters: { ...currentRequest, userId: user.id },
  //   };

  //   const [userFeature] = await selectUserFeature(paramsUserFeatures);

  //   const hasFeature = Boolean(userFeature);
  //   const featureIsActive = Boolean(userFeature?.isActive);

  //   if (!hasFeature || !featureIsActive)
  //     throw new Error('Functionality cannot be accessed.');
  // }

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.token || req.cookies.token;

      const {
        baseUrl,
        route: { path },
        method,
        params,
      } = req;

      const hasEndBar = Boolean(path.substring(path.length - 1) === '/');
      const hasParameters = Boolean(Object.keys(params).length);
      const newRoute = !hasEndBar && !hasParameters ? path + '/' : path;

      console.log({
        token,
        baseUrl,
        route: newRoute,
        method,
      });

      const decoded = await this.jwtService.decode(token);
      if (!Object.keys(decoded).length) throw new Error('Invalid token.');

      next();
    } catch (error) {
      throw new BadRequestException({
        message: 'Token must be provided for this request',
        token: 'TOKEN_NOT_PROVIDED',
      });
    }
  }
}
