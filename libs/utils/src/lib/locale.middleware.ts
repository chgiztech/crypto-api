import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class Middleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { headers } = req as any;
    if (headers['accept-language']) {
    //   const [lang] = headers['accept-language'].split(',');
    //   req.headers['accept-language'] = lang.split(';')[0].trim();
    }
    next();
  }
}
