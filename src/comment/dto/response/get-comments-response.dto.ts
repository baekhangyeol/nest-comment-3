import { Comment } from '../../entities/comment.entity';

export class GetCommentsResponseDto {
  id: number;
  content: string;
  writer: string;
  parentId?: number;
  postId: number;
  childComments?: GetCommentsResponseDto[];
  likeCount?: number;

  public static fromEntity(entity: Comment): GetCommentsResponseDto {
    const dto = new GetCommentsResponseDto();
    dto.id = entity.id;
    dto.content = entity.content;
    dto.writer = entity.writer;
    dto.likeCount = entity.likes?.length;
    dto.postId = entity.post?.id;
    if(entity.parentComment) {
      dto.parentId = entity.parentComment.id;
    }
    if(entity.childComments) {
      dto.childComments = entity.childComments.map(childComment => GetCommentsResponseDto.fromEntity(childComment));
    }
    return dto;
  }
}