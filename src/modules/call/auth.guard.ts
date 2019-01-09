import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from '../../../node_modules/@types/express';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  public canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.header('Authorization');
    return token ? this.validateToken(token) : false;
  }

  private validateToken(token: string): boolean {
    return token.replace('Bearer ', '') === this.config.authToken;
  }
}
