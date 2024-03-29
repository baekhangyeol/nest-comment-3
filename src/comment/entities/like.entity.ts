import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Comment, comment => comment.likes, { onDelete: 'CASCADE' })
  comment: Comment;
}