import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { CreateCommentResponseDto } from './dto/response/create-comment-repsonse.dto';
import { CreateCommentRequestDto } from './dto/request/create-comment-request.dto';
import { CreateReplyRequestDto } from './dto/request/create-reply-request.dto';
import { Post } from './entities/post.entity';
import { CreateReplyResponseDto } from './dto/response/create-reply-response.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { createPaginationResult, PaginationResult } from '../common/util/pagination.util';
import { GetCommentsResponseDto } from './dto/response/get-comments-response.dto';
import { CreateLikeRequestDto } from './dto/request/create-like-request.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
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

  async createReply(dto: CreateReplyRequestDto, commentId: number): Promise<CreateReplyResponseDto> {
    const parentComment = await this.commentRepository.findOne({ where: { id: commentId }, relations: ['post'] });
    if (!parentComment) {
      throw new Error('부모 댓글을 찾을 수 없습니다.');
    }
    const post = parentComment.post;
    const entity = this.commentRepository.create( {...dto, parentComment, post } );
    await this.commentRepository.save(entity);
    return CreateReplyResponseDto.fromEntity(entity);
  }

  async getComments(dto: PaginationDto, postId: number): Promise<PaginationResult<GetCommentsResponseDto>> {
    const [comments, total] = await this.commentRepository
      .createQueryBuilder('comment')
      .select([
        'comment.id',
        'comment.content',
        'comment.writer',
        'comment.postId',
      ])
      .leftJoinAndSelect('comment.post', 'post')
      .leftJoinAndSelect('comment.likes', 'likes')
      .leftJoinAndSelect('comment.childComments', 'childComments', 'childComments.isHidden = :isHidden', { isHidden: false })
      .leftJoinAndSelect('childComments.likes', 'childLikes')
      .where('comment.post.id = :postId', { postId })
      .andWhere('comment.isHidden = :isHidden', { isHidden: false })
      .andWhere('comment.parentCommentId IS NULL')
      .skip((dto.page - 1) * dto.limit)
      .take(dto.limit)
      .getManyAndCount();


    const data = comments.map(comment => GetCommentsResponseDto.fromEntity(comment));

    return createPaginationResult(data, dto.page, dto.limit, total);
  }

  async deleteComment(commentId: number): Promise<void> {
    await this.commentRepository.delete({ id: commentId });
  }

  async likeComment(dto: CreateLikeRequestDto, commentId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id: commentId } });
    if (!comment) {
      throw new Error('댓글을 찾을 수 없습니다.');
    }
    const existingLike = await this.likeRepository.findOne({
      where: {
        comment: { id: commentId },
        name: dto.name,
      },
    });
    if (existingLike) {
      throw new Error("이미 좋아요를 누른 댓글입니다.");
    }

    const like = this.likeRepository.create({ ...dto, comment});
    await this.likeRepository.save(like);
  }
}
