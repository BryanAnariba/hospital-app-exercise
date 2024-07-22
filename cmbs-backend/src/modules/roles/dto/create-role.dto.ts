import { IsNotEmpty, IsString, IsUppercase, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsUppercase()
  public roleName: string;
}
