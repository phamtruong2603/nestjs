import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './repository/auth.repository';
import { RegisterDto } from './dto/register.dto';
import { ResponseTypeRepository } from '../../repository/response.type.repository';
import { User } from './entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async register(
    data: RegisterDto,
  ): Promise<ResponseTypeRepository<{ user: User; token?: string }>> {
    const foundUser = await this.authRepository.findByCondition({
      email: data.email,
    });
    if (foundUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);

    const newUser = await this.authRepository.create({
      ...data,
      password: hashedPassword,
    });

    const user = await this.authRepository.create(newUser);
    const token = await this.jwtService.signAsync(user.id);
    if (user) {
      return {
        status: HttpStatus.CREATED,
        code: '1000',
        message: 'OK',
        data: { user, token },
      };
    }
  }

  async login(
    data: LoginDto,
  ): Promise<ResponseTypeRepository<{ user: User; token?: string }>> {
    const foundUser = await this.authRepository.findByCondition({
      email: data.email,
    });

    if (foundUser) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, foundUser.password);
    if (!hashedPassword) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = await this.jwtService.signAsync(foundUser.id);
    return {
      status: HttpStatus.CREATED,
      code: '1000',
      message: 'OK',
      data: { user: foundUser, token },
    };
  }

  async validateUser(email: string) {
    return true;
  }
}
