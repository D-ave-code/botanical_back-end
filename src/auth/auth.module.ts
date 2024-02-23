import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.APP_SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }), UsersModule
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
