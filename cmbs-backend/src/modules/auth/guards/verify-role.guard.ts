import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RolesService } from 'src/modules/roles/roles.service';
import { META_ROLES, Roles } from '../enums';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class VerifyRoleGuard implements CanActivate {

  constructor(
    private readonly rolesService: RolesService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: Roles[] = this.reflector.get(META_ROLES, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    // console.log(user)
  
    if (!user) throw new HttpException(`Logged user not found in request headers `, HttpStatus.UNAUTHORIZED);
    // console.log('Verify user role, Roles accepted for this request: ', validRoles);

    if (validRoles.length > 0) {
      if (!validRoles.includes(user.role.roleName as Roles)) throw new ForbiddenException(`You does not have an access, the valid roles for this request are: ${validRoles}`);
    }

    return true;
  }

  // Revisar!!!
  public async verifyRoles (validRoles: Roles[], user: User): Promise<boolean> {
    if (validRoles.length > 0) {
      let roleNotFound = await validRoles.map(
        async (role) => {
          const rolefounded = await this.rolesService.findOneByName(role)
          if (!rolefounded) return true;
        }
      );
      console.log({roleNotFound})
      if (roleNotFound) throw new ForbiddenException(`Some of this roles does not exists in the DB, ${validRoles}`);
      if (!validRoles.includes(user.role.roleName as Roles)) throw new ForbiddenException(`You does not have an access, the valid roles for this request are: ${validRoles}`);
      return true;
    } else {
      // Si llega aqui es que todas los roles pueden ver la ruta
      return true;
    }
  }
}
