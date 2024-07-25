import { Role } from "src/modules/roles/entities/role.entity";

export interface JWTPayload {
    id: string;
    email: string;
    role: Role;
  }