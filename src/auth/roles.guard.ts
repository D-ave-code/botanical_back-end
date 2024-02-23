import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authorizedRoles = this.reflector.get(Roles, context.getHandler());
    const user = context.switchToHttp().getRequest().user;
    return authorizedRoles.indexOf(user.role) > -1;
  }
}
