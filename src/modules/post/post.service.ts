import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { Post } from './schemas/post.schema';
import { PostRepository } from './repostory/post.repository';
import { ResponseTypeRepository } from '../../repository/response.type.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getAllPost(): Promise<ResponseTypeRepository<Post[]>> {
    const posts = await this.postRepository.getByCondition({});
    if (posts) {
      return {
        status: HttpStatus.OK,
        code: '1000',
        message: 'list posts',
        data: posts,
      };
    }
    return {
      status: HttpStatus.BAD_GATEWAY,
      code: '1000',
      message: 'server error',
      data: null,
    };
  }

  async getPostById(id: string): Promise<ResponseTypeRepository<Post>> {
    const post = await this.postRepository.findById(id);
    if (post) {
      return {
        status: HttpStatus.OK,
        code: '1000',
        message: 'find post success',
        data: post,
      };
    } else if (!post) {
      return {
        status: HttpStatus.OK,
        code: '1000',
        message: 'Post not found',
        data: null,
      };
    }
    return {
      status: HttpStatus.BAD_GATEWAY,
      code: '1000',
      message: 'server error',
      data: null,
    };
  }

  async createPost(body: CreatePostDto): Promise<ResponseTypeRepository<Post>> {
    if (!body.title) {
      return {
        status: HttpStatus.NOT_FOUND,
        code: '1000',
        message: 'missing title!!!',
        data: null,
      };
    }
    const newPost = await this.postRepository.create(body);
    if (newPost) {
      return {
        status: HttpStatus.CREATED,
        code: '1000',
        message: 'create new post successfully!!!',
        data: newPost,
      };
    }
    return {
      status: HttpStatus.BAD_GATEWAY,
      code: '1000',
      message: 'server error',
      data: null,
    };
  }

  async replacePost(
    id: string,
    post: UpdatePostDto,
  ): Promise<ResponseTypeRepository<Post>> {
    const newPost = await this.postRepository.findByConditionAndUpdate(
      { id: id },
      post,
    );
    if (newPost) {
      return {
        status: HttpStatus.CREATED,
        code: '1000',
        message: 'create new post successfully!!!',
        data: newPost,
      };
    }
    return {
      status: HttpStatus.BAD_GATEWAY,
      code: '1000',
      message: 'server error',
      data: null,
    };
  }

  // async deletePost(id: string): Promise<ResponseTypeRepository<boolean>> {
  //   const delatePost = await this.postRepository.deleteOne(id);
  //   if (delatePost) {
  //     return {
  //       status: HttpStatus.CREATED,
  //       code: '1000',
  //       message: 'create new post successfully!!!',
  //       data: true,
  //     };
  //   }
  //   return {
  //     status: HttpStatus.BAD_GATEWAY,
  //     code: '1000',
  //     message: 'server error',
  //     data: null,
  //   };
  // }
}
