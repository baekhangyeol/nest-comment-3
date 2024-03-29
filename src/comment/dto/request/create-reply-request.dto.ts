import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReplyRequestDto {
  @Length(1, 1000, { message: '댓글은 최소 1자 이상 1000자 이하로 작성해야합니다.'})
  @IsNotEmpty()
  @ApiProperty({
    example: 'content',
  })
  content: string;

  @Length(1, 20, { message: '댓글 작성자는 최소 1자 이상 20자 이하로 작성해야합니다.'})
  @IsNotEmpty()
  @ApiProperty({
    example: 'writer',
  })
  writer: string;
}