import { Injectable, NestMiddleware, MiddlewareFunction, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      /* prevent get calls info without access token */
      if (req['headers']['x-access-token'] === undefined){
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      next();
    };
  }
}
//
// host: 'localhost:3000',
//   connection: 'keep-alive',
//   'cache-control': 'no-cache',
//   'user-agent':
