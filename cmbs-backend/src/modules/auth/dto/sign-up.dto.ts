import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class SignUpDto {
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
}
