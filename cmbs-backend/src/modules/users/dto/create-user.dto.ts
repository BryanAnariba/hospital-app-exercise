import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public completeName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @MinLength(6)
  public password: string;

  @IsUUID()
  @IsNotEmpty()
  public role: string
}
