import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {

  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
