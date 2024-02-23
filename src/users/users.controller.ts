import { Body, Controller, Get, ParseIntPipe, Post,Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateTokenDto } from './dto/update-tok.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Usuarios')
/* @ApiBearerAuth() */
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Post()
    createUser(@Body() newUser: CreateUserDto){
        return  this.usersService.createUser(newUser)
    }
    @Get()
    getUsers(){
        return this.usersService.geteUsers()
    }
    @Get('email')
    getUser(@Body() email_: string){
        return this.usersService.geteUser(email_)
    }
    /* @UseGuards(JwtAuthGuard)  */
    @Put('updatetoken')
    updateUser(@Body() user:UpdateTokenDto){
        return this.usersService.updateToken_notUser(user)
    }
  
 
}
