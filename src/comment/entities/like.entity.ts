import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: String;

  @ManyToOne(type => Comment, comment => comment.likes, { onDelete: 'CASCADE' })
  comment: Comment;
}