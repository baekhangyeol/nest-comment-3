import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentResponseDto } from './dto/response/create-comment-repsonse.dto';
import { CreateCommentRequestDto } from './dto/request/create-comment-request.dto';
import { CreateReplyRequestDto } from './dto/request/create-reply-request.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createComment(dto: CreateCommentRequestDto, postId: number): Promise<CreateCommentResponseDto> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new Error('게시글을 찾을 수 없습니다.');
    }
    const entity = this.commentRepository.create( {...dto, post} );
    await this.commentRepository.save(entity);
    return CreateCommentResponseDto.fromEntity(entity);
  }
}
