import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: String;

  @Column()
  content: String;

  @ManyToOne(type => Comment, comment => comment.reports, { onDelete: 'CASCADE' })
  comment: Comment;
}