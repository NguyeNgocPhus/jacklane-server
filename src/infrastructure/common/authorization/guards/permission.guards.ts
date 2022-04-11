import {CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";


@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const permissions = this.reflector.get<string[]>('PERMISSIONS', context.getHandler());

    const { user } = context.switchToHttp().getRequest();
    //console.log(user);
    if (!permissions || permissions.length === 0)
      return true;
    const authorizedPerms =user?.permissions;
    if (!authorizedPerms || authorizedPerms.length === 0) {
      throw new ForbiddenException({
        error: "Forbidden resource",
        requiredPermissions: [...permissions]
      });
    }
    // Match permissions and authorizedPerms
    if (!permissions.some(p => authorizedPerms.indexOf(p) > -1)) {
      throw new ForbiddenException({
        error: "Forbidden resource",
        requiredPermissions: [...permissions],
        ngu:"hello"
      });
    }

    return true
  }

}