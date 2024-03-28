import { Length } from 'class-validator';

export class CreateReplyRequestDto {
  @Length(1, 1000, { message: '댓글은 최소 1자 이상 1000자 이하로 작성해야합니다.'})
  content: string;

  @Length(1, 20, { message: '댓글 작성자는 최소 1자 이상 20자 이하로 작성해야합니다.'})
  writer: string;
}