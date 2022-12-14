import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sessions } from './entities/session.entity';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { UsersModule } from './../users/users.module';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sessions]),
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SALT,
      signOptions: { expiresIn: '1 minute' }
    }),
  ],
  controllers: [SessionController],
  providers: [SessionService, JwtService, JwtStrategy],
  exports: [SessionService]
})
export class SessionModule { }
