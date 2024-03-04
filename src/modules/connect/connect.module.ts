import { Module } from '@nestjs/common';
import { ConnectService } from './connect.service';
import { ConnectController } from './connect.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connect } from './entities/connect.entity';
import { ConnectRepository } from './connect.repository';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Connect])],
  controllers: [ConnectController],
  providers: [ConnectService, ConnectRepository],
})
export class ConnectModule {}
