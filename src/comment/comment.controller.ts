import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentRequestDto } from './dto/request/create-comment-request.dto';
import { CreateReplyRequestDto } from './dto/request/create-reply-request.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateLikeRequestDto } from './dto/request/create-like-request.dto';
import { CreateReportRequestDto } from './dto/request/create-report-request.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('comments')
@ApiTags('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:postId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '댓글 생성 API' })
  @ApiBody({ type: CreateCommentRequestDto })
  @ApiResponse({ status: 201, description: '댓글 생성 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async createComment(@Body() request: CreateCommentRequestDto, @Param('postId') postId: number){
    return this.commentService.createComment(request, postId);
  }

  @Post('/replies/:commentId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '대댓글 생성 API' })
  @ApiBody({ type: CreateReplyRequestDto })
  @ApiResponse({ status: 201, description: '대댓글 생성 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async createReply(@Body() request: CreateReplyRequestDto, @Param('commentId') commentId: number){
    return this.commentService.createReply(request, commentId);
  }

  @Get('/:postId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '댓글/대댓글 조회 API' })
  @ApiResponse({ status: 200, description: '댓글 조회 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async getComments(@Param('postId') postId: number, @Query() request: PaginationDto){
    return this.commentService.getComments(request, postId);
  }

  @Delete('/:commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '댓글/대댓글 삭제 API' })
  @ApiResponse({ status: 204, description: '댓글 삭제 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async deleteComment(@Param('commentId') commentId: number){
    return this.commentService.deleteComment(commentId);
  }

  @Post('/likes/:commentId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '댓글/대댓글 좋아요 API' })
  @ApiBody({ type: CreateLikeRequestDto })
  @ApiResponse({ status: 201, description: '좋아요 생성 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async createLike(@Param('commentId') commentId: number, @Body() request: CreateLikeRequestDto){
    return this.commentService.likeComment(request, commentId);
  }

  @Post('/reports/:commentId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '댓글/대댓글 신고 API' })
  @ApiBody({ type: CreateReportRequestDto })
  @ApiResponse({ status: 201, description: '신고 생성 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async createReport(@Param('commentId') commentId: number, @Body() request: CreateReportRequestDto){
    return this.commentService.reportComment(request, commentId);
  }
}
