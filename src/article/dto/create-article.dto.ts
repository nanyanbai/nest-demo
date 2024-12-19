import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  Length,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({ message: '标题不能为空' })
  @IsString({ message: '标题必须是字符串' })
  @Length(2, 100, { message: '标题长度必须在2-100字符之间' })
  title: string;

  @IsNotEmpty({ message: '内容不能为空' })
  @IsString({ message: '内容必须是字符串' })
  @MinLength(10, { message: '内容最少10个字符' })
  content: string;

  @IsNotEmpty({ message: '作者不能为空' })
  @IsString({ message: '作者必须是字符串' })
  @Length(2, 50, { message: '作者名称长度必须在2-50字符之间' })
  author: string;

  @IsOptional()
  @IsBoolean({ message: '置顶标志必须是布尔值' })
  isTop?: boolean;
}
