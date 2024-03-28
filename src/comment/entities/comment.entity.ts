import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { Reply } from './reply.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  writer: string;

  @ManyToOne(type => Post, post => post.comments)
  post: Post;

  @OneToMany(type => Reply, reply => reply.comment)
  replies: Reply[];

  @Column({ default: 0 })
  likeCount: number;

  @Column({ default: 0 })
  reportCount: number;
}
