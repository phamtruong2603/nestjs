import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ConnectService } from './connect.service';
import { CreateConnectDto } from './dto/create-connect.dto';
import { UpdateConnectDto } from './dto/update-connect.dto';
import { HttpService } from '@nestjs/axios';
import { Public } from '../../guard/public.decorator';

@Controller('connect')
export class ConnectController {
  constructor(
    private readonly connectService: ConnectService,
    private readonly httpService: HttpService,
  ) {}

  @Public()
  @Get('connect')
  async connectToExternalURL() {
    const url = 'http://192.168.1.18:8088/users';
    await this.httpService.get(url).subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Completed'),
    });
    return true;
  }

  @Post()
  create(@Body() createConnectDto: CreateConnectDto, @Request() req) {
    return this.connectService.create(createConnectDto, req.user);
  }

  @Get()
  findAll() {
    return this.connectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.connectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConnectDto: UpdateConnectDto) {
    return this.connectService.update(+id, updateConnectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.connectService.remove(+id);
  }
}
