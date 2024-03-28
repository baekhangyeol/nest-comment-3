  import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { Comment } from './entities/comment.entity';
  import { Post } from './entities/post.entity';
  import { Like } from './entities/like.entity';
  import { Report } from './entities/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, Like, Report])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
