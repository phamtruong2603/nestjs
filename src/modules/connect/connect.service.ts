import { Injectable } from '@nestjs/common';
import { CreateConnectDto } from './dto/create-connect.dto';
import { UpdateConnectDto } from './dto/update-connect.dto';
import { ConnectRepository } from './connect.repository';
import { User } from '../auth/entity/user.entity';
import { Connect } from './entities/connect.entity';

@Injectable()
export class ConnectService {
  constructor(private readonly connectRepository: ConnectRepository) {}
  create(createConnectDto: any, user: User) {
    const newConnect = new Connect();
    console.log(user);
    newConnect.user = user;
    newConnect.title = createConnectDto.title;
    newConnect.description = createConnectDto.description;
    return this.connectRepository.saveConnect(newConnect);
  }

  findAll() {
    return `This action returns all connect`;
  }

  findOne(id: number) {
    return `This action returns a #${id} connect`;
  }

  update(id: number, updateConnectDto: UpdateConnectDto) {
    return `This action updates a #${id} connect`;
  }

  remove(id: number) {
    return `This action removes a #${id} connect`;
  }
}
