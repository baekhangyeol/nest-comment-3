import { Comment } from '../../entities/comment.entity';

export class CreateCommentResponseDto {
  id: number;
  content: string;
  writer: string;

  public static fromEntity(entity: Comment): CreateCommentResponseDto {
    const dto = new CreateCommentResponseDto();
    dto.id = entity.id;
    dto.content = entity.content;
    dto.writer = entity.writer;
    return dto;
  }
}