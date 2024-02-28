import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PostModule } from './modules/post/post.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
// import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/auth/entity/user.entity';

@Module({
  imports: [
    // config
    ConfigModule.forRoot(),

    // database config
    // MongooseModule.forRoot(process.env.MONGODB_URL),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT, 10), // Parse port as a number
      database: process.env.DATABASE_NAME,
      entities: [User],
      synchronize: true,

      // host: '127.0.0.1',
      // username: 'root',
      // password: 'root',
      // port: 6868,
      // database: 'test',
    }),

    // import module
    // PostModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
