import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { Like } from './like.entity';
import { Report } from './report.entity';

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

  @ManyToOne(type => Comment, { onDelete: 'CASCADE' }) // 자기 자신을 참조하는 관계
  parentComment: Comment;

  @OneToMany(type => Comment, comment => comment.parentComment, { cascade: true })
  childComments: Comment[];

  @OneToMany(type => Like, like => like.comment)
  likes: Like[];

  @OneToMany(type => Report, report => report.comment)
  reports: Report[];

  @Column()
  isHidden: boolean;
}
