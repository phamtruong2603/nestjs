import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schemas/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private postModel: Model<Post>) {}

  getAllPost() {
    debugger;
    return this.postModel;
  }

  getPostById(id: number) {
    const post = this.postModel.find((post: any) => post.id === id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  createPost(body: CreatePostDto) {
    const newPost = new this.postModel(body);
    return newPost.save();
  }

  replacePost(id: number, post: UpdatePostDto) {
    const postIndex = this.postModel.findById(id);
    if (postIndex) {
      // this.postModel[postIndex] = <IPost>post;
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  deletePost(id: number) {
    const foundPost = this.postModel.findById(id);
    if (foundPost) {
      return foundPost.deleteOne();
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
}
