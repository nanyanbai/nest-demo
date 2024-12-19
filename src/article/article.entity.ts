import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '主键ID' })
  id: number;

  @Column({
    length: 100,
    comment: '文章标题',
  })
  title: string;

  @Column({
    type: 'text',
    comment: '文章内容',
  })
  content: string;

  @Column({
    length: 50,
    comment: '作者',
  })
  author: string;

  @Column({
    name: 'view_count',
    type: 'int',
    unsigned: true,
    default: 0,
    comment: '浏览量',
  })
  viewCount: number;

  @Column({
    name: 'like_count',
    type: 'int',
    unsigned: true,
    default: 0,
    comment: '点赞数',
  })
  likeCount: number;

  @Column({
    name: 'is_top',
    type: 'tinyint',
    width: 1,
    default: 0,
    comment: '是否置顶：0-否，1-是',
  })
  isTop: boolean;

  @CreateDateColumn({
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '更新时间',
  })
  updatedAt: Date;
}
