import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;
  content: string;
}

export class UpdatePostDto {
  title: string;
  content: string;
}
