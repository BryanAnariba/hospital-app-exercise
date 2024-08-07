import { SetMetadata } from '@nestjs/common';
import { META_ROLES, Roles } from '../enums';

export const ProtectedRouteByRole = (...args: Roles[]) => {
  return SetMetadata(META_ROLES, args);
};
