import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenParser implements NestMiddleware {
  use(req, res: Response, next: () => void) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      // console.log(token);
      if (token) {
        req.token = token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        req.user = decoded.id;
      }
      next();
    } catch (e) {
      console.log(e);
    }
  }
}
