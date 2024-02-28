import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../repository/base.repository';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User) // Truyền kiểu User vào @InjectRepository()
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository); // Gọi constructor của lớp cha và chuyển userRepository vào
  }
  async getUserByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email: email } });
  }

  async saveUser(data: User): Promise<User> {
    return this.create(data);
  }
}
