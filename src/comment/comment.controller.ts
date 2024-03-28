import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentRequestDto } from './dto/request/create-comment-request.dto';
import { CreateReplyRequestDto } from './dto/request/create-reply-request.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:postId')
  @HttpCode(HttpStatus.CREATED)
  async createComment(@Body() request: CreateCommentRequestDto, @Param('postId') postId: number){
    return this.commentService.createComment(request, postId);
  }

  @Post('/replies/:commentId')
  @HttpCode(HttpStatus.CREATED)
  async createReply(@Body() request: CreateReplyRequestDto, @Param('commentId') commentId: number){
    return this.commentService.createReply(request, commentId);
  }

  @Get('/:postId')
  @HttpCode(HttpStatus.OK)
  async getComments(@Param('postId') postId: number, @Query() request: PaginationDto){
    return this.commentService.getComments(request, postId);
  }
}