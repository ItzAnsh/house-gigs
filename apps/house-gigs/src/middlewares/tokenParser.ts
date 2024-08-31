import { NestMiddleware, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenParser implements NestMiddleware {
  use(req, res: Response, next: () => void) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new HttpErrorByCode[401]('Token Not Found');
      }

      if (token.startsWith('Bearer ')) {

        req.token = token;

        const splitToken = token.split(" ")[1];
        const decoded = jwt.verify(splitToken, process.env.JWT_SECRET);

        req.user = decoded.id;
        next();
      } else {
        throw new HttpErrorByCode[401]('Token Not Found');
      }
    } catch (e) {
      if (TypeError.isPrototypeOf(e)) {
        throw new HttpErrorByCode[401]('Token Not Found');
      }
      console.log(e);

      throw new HttpErrorByCode[401]('Invalid Token');
    }
  }
}
