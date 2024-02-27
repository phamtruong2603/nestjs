import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../repository/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entity/user.entity';

@Injectable()
export class AuthRepository extends BaseRepository<User> {
  constructor(
    @InjectModel('User')
    private readonly postModel: Model<User>,
  ) {
    super(postModel);
  }
}
