import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { AccountRole } from '@module/account/entities/account.entity';

import { BaseHttpException } from '@common/base/base-http-exception';
import {
  PermissionDeniedError,
  UnauthorizedError,
} from '@common/base/base.error';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (this.isAdminRoute(request.originalUrl) === false) {
      return true;
    }

    const user = request.user;

    if (!user) {
      throw new BaseHttpException(
        HttpStatus.UNAUTHORIZED,
        new UnauthorizedError(),
      );
    }

    if (user.role !== AccountRole.admin) {
      throw new BaseHttpException(
        HttpStatus.FORBIDDEN,
        new PermissionDeniedError(),
      );
    }

    return true;
  }

  private isAdminRoute(url: string): boolean {
    const segments = url.split('/').filter((segment) => segment.length > 0);

    return segments[0] === 'admin';
  }
}
