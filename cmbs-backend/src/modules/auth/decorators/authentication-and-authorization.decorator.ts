import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from '../enums';
import { AuthGuard } from '@nestjs/passport';
import { ProtectedRouteByRole } from './protected-route-by-role.decorator';
import { VerifyRoleGuard } from '../guards';

export const AuthenticationAndAuthorization = (...roles: Roles[]) => {
  return applyDecorators(
    ProtectedRouteByRole(...roles),
    UseGuards(AuthGuard('jwt'), VerifyRoleGuard),
  );
};
