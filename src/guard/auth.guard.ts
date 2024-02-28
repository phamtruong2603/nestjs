import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
import { AuthRepository } from '../modules/auth/repository/auth.repository';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private readonly authRepository: AuthRepository,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new HttpException('not token', HttpStatus.UNAUTHORIZED);
    }

    const decoded = await this.authService.verifyToken(token).catch((e) => {
      if (e.name === 'JsonWebTokenError') {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      } else if (e.name === 'TokenExpiredError') {
        throw new HttpException('Expired token', HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException('INTERNAL !!!', HttpStatus.UNAUTHORIZED);
      }
    });
    const user = await this.authRepository.getUserByEmail(decoded.email);
    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    request['user'] = user;
    return true;
  }

  private extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
