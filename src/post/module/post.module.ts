import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../schemas/post.schema';
import { PostController } from '../controller/post.controller';
import { PostService } from '../service/post.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Post", schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class CatsModule {}
