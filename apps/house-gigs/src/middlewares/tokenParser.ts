import { NestMiddleware, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenParser implements NestMiddleware {
  use(req, res: Response, next: () => void) {
    try {
      // console.log(req.headers.authorization);
      const token = req.headers.authorization;

      if (!token) {
        throw new HttpErrorByCode[401]('Token Not Found');
      }

      if (token.startsWith('Bearer ')) {
        // console.log(token);

        req.token = token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        req.user = decoded.id;
        next();
      } else {
        throw new HttpErrorByCode[401]('Token Not Found');
      }
    } catch (e) {
      // console.log(e);
      if (TypeError.isPrototypeOf(e)) {
        throw new HttpErrorByCode[401]('Token Not Found');
      }
      throw e;
    }
  }
}
