import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/users/dto/logindto.dto';
import { RegisterDto } from 'src/users/dto/registerdt0.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('login')
    @HttpCode(200)
    getelogin(@Body() email: LoginDto){
       
        return this.authService.login(email)
    }
    @Post("register")
    register(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto);
    }

}
