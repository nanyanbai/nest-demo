import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { QueryArticleDto } from './dto/query-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  // 创建文章
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = this.articleRepository.create(createArticleDto);
    return await this.articleRepository.save(article);
  }

  // 获取所有文章（按置顶和创建时间排序）
  async findAll(queryDto: QueryArticleDto) {
    const { page = 1, limit = 10, title, author, isTop } = queryDto;
    const skip = (page - 1) * limit;

    // 构建查询条件
    const whereConditions: any = {};

    if (title) {
      whereConditions.title = Like(`%${title}%`);
    }

    if (author) {
      whereConditions.author = Like(`%${author}%`);
    }

    if (isTop !== undefined) {
      whereConditions.isTop = isTop;
    }

    const [items, total] = await this.articleRepository.findAndCount({
      where: whereConditions,
      order: {
        isTop: 'DESC',
        createdAt: 'DESC',
      },
      skip,
      take: limit,
    });

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        filters: {
          title,
          author,
          isTop,
        },
      },
    };
  }

  // 获取单篇文章（并增加浏览量）
  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`文章ID ${id} 不存在`);
    }

    // 增加浏览量
    article.viewCount += 1;
    await this.articleRepository.save(article);

    return article;
  }

  // 更新文章
  async update(
    id: number,
    updateArticleDto: CreateArticleDto,
  ): Promise<Article> {
    const article = await this.findOne(id);

    Object.assign(article, updateArticleDto);
    return await this.articleRepository.save(article);
  }

  // 删除文章
  async remove(id: number): Promise<void> {
    const result = await this.articleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`文章ID ${id} 不存在`);
    }
  }

  // 切换文章置顶状态
  async toggleTop(id: number): Promise<Article> {
    const article = await this.findOne(id);
    article.isTop = !article.isTop;
    return await this.articleRepository.save(article);
  }

  // 文章点赞
  async like(id: number): Promise<Article> {
    const article = await this.findOne(id);
    article.likeCount += 1;
    return await this.articleRepository.save(article);
  }
}
