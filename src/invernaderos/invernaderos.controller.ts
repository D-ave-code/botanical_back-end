import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { InvernaderosService } from './invernaderos.service';
import { Users } from 'src/database/entities/users.entity';
import { CreatepplantsDto } from './dto/create-pplants.dto';
import { Pplants } from 'src/database/entities/ppants.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('invernaderos')
@ApiBearerAuth()
@Controller('invernaderos')
export class InvernaderosController {
    constructor(private pplantRepository: InvernaderosService) {}
    
    @Post('usuario')
    @UseGuards(JwtAuthGuard)
    @ApiBody({
        schema: {
          required: ['userId'], // Listar nombres de propiedades requeridas
          properties: {
            userId: { type: 'number', }, // Marcar individualmente
          },
        },
      })
    getePplnat(@Body('userId', ParseIntPipe) userId: number){
        return this.pplantRepository.getePplnat(userId)
    }
    @Post('agricultor')
    @ApiBody({
        schema: {
          required: ['managerId'], // Listar nombres de propiedades requeridas
          properties: {
            managerId: { type: 'number', }, // Marcar individualmente
          },
          
        },
      })
      getePplnatAgri(@Body('managerId', ParseIntPipe) managerId: number){
       
        return this.pplantRepository.getePplnatAgri(managerId)
    }

}
