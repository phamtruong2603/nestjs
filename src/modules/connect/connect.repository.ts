import { BaseRepository } from '../../repository/base.repository';
import { Connect } from './entities/connect.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class ConnectRepository extends BaseRepository<Connect> {
  constructor(
    @InjectRepository(Connect)
    private readonly connectRepository: Repository<Connect>,
  ) {
    super(connectRepository);
  }

  async saveConnect(data: any) {
    return await this.create(data);
  }
}
