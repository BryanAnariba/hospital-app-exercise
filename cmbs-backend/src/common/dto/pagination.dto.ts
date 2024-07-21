import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  public take: number = 5;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  public skip: number = 0;
}
