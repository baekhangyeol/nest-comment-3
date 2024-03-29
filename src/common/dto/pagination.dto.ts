import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    example: 1,
  })
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    example: 10,
  })
  limit: number = 10;
}