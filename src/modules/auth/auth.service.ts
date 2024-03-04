import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { RegisterDto } from './dto/register.dto';
import { ResponseTypeRepository } from '../../repository/response.type.repository';
import { User } from './entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async register(
    data: RegisterDto,
  ): Promise<ResponseTypeRepository<{ user: User; token?: string }>> {
    const foundUser = await this.authRepository.getUserByEmail(data.email);
    if (foundUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);

    const newUser = new User();
    newUser.email = data.email;
    newUser.password = hashedPassword;
    newUser.name = data.name;
    newUser.dateOfBirth = data.dateOfBirth;

    const user = await this.authRepository.saveUser(newUser);
    if (user) {
      const token = await this.signToken(user.id, user.email);
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
    const foundUser = await this.authRepository.getUserByEmail(data.email);

    if (!foundUser) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.compare(
      data.password,
      foundUser.password,
    );
    if (!hashedPassword) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = await this.signToken(foundUser.id, foundUser.email);
    return {
      status: HttpStatus.OK,
      code: '1000',
      message: 'OK',
      data: { user: foundUser, token },
    };
  }

  async autoLogin(
    user: User,
  ): Promise<ResponseTypeRepository<{ user: User; token?: string }>> {
    const token = await this.signToken(user.id, user.email);
    return {
      status: HttpStatus.OK,
      code: '1000',
      message: 'OK',
      data: { user: user, token },
    };
  }

  async getAllUser(): Promise<ResponseTypeRepository<User[]>> {
    const users = await this.authRepository.findAll({
      relations: { connects: false },
    });
    return {
      status: HttpStatus.OK,
      code: '1000',
      message: 'OK',
      data: users,
    };
  }

  async updateUser(
    data: any,
    user: User,
  ): Promise<ResponseTypeRepository<User>> {
    if (data?.id !== user.id) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        code: '1000',
        message: 'UNAUTHORIZED',
        data: null,
      };
    }
    const newUser = await this.authRepository.update({
      ...user,
      ...data,
    });
    return {
      status: HttpStatus.OK,
      code: '1000',
      message: 'OK',
      data: newUser,
    };
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: process.env.SECRET,
    });
  }

  private async signToken(id: number, email: string): Promise<string> {
    return await this.jwtService.signAsync({
      id: id,
      email: email,
    });
  }
}
