import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public completeName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsUUID()
  @IsNotEmpty()
  public role: string;
}
