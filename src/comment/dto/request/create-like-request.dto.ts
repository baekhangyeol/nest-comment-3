import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'name',
  })
  name: String;
}