import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { QueryArticleDto } from './dto/query-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // 创建文章
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articleService.create(createArticleDto);
  }

  // 获取文章列表（带查询条件和分页）
  @Get()
  async findAll(@Query() queryDto: QueryArticleDto) {
    return await this.articleService.findAll(queryDto);
  }

  // 获取单篇文章
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return await this.articleService.findOne(id);
  }

  // 更新文章
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return await this.articleService.update(id, updateArticleDto);
  }

  // 删除文章
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.articleService.remove(id);
  }

  // 切换文章置顶状态
  @Patch(':id/toggle-top')
  async toggleTop(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return await this.articleService.toggleTop(id);
  }

  // 文章点赞
  @Patch(':id/like')
  async like(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return await this.articleService.like(id);
  }
}
