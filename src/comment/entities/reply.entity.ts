import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  writer: string;

  @ManyToOne(type => Comment, comment => comment.replies)
  comment: Comment;

  @Column({default: 0})
  likeCount: number;

  @Column({default: 0})
  reportCount: number;
}