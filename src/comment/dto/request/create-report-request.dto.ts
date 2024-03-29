import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'name',
  })
  name: String;

  @IsNotEmpty()
  @ApiProperty({
    example: 'content',
  })
  content: String;
}