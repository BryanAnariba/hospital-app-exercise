import { IsOptional, IsString, IsUUID } from "class-validator";

export class GetUsersByTerms {

  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  completeName?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  role?: string;
}