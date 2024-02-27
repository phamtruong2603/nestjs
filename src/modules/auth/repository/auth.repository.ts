import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../repository/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthRepository extends BaseRepository<any> {
  constructor(
    @InjectModel('')
    private readonly postModel: Model<any>,
  ) {
    super(postModel);
  }
}
