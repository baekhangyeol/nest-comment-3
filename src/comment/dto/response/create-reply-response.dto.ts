import { Comment } from '../../entities/comment.entity';

export class CreateReplyResponseDto {
  postId: number;
  parentId: number;
  id: number;
  content: string;
  writer: string;

  public static fromEntity(entity: Comment): CreateReplyResponseDto {
    const dto = new CreateReplyResponseDto();
    dto.postId = entity.parentComment.post.id;
    dto.parentId = entity.parentComment.id;
    dto.id = entity.id;
    dto.content = entity.content;
    dto.writer = entity.writer;
    return dto;
  }
}