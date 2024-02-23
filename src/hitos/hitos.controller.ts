import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HitosService } from './hitos.service';
import { CreateHitoDto } from './dto/create-hito.dto';
@ApiTags('hitos')
/* @ApiBearerAuth() */
//@UseGuards(JwtAuthGuard)
@Controller('hitos')
export class HitosController {
  constructor(private hitoRepository: HitosService) {}

  @Post('listar')
  @ApiBody({
    schema: {
      required: ['plantaId'], // Listar nombres de propiedades requeridas
      properties: {
        plantaId: { type: 'number' }, // Marcar individualmente
      },
    },
  })
  geteHitosByManager(@Body('plantaId', ParseIntPipe) plantaId: number) {
    return this.hitoRepository.geteHitosByPplant(plantaId);
  }
  @Get('listarmanager')
  @ApiBody({
    schema: {
      required: ['managerId'], // Listar nombres de propiedades requeridas
      properties: {
        managerId: { type: 'number' }, // Marcar individualmente
      },
    },
  })
  getPplantsByManager(@Body('managerId', ParseIntPipe) managerId: number) {
    return this.hitoRepository.getPlantsByManager(managerId);
  }
  @Post('create')
  @ApiBody({
    schema: {
      required: ['managerId'], // Listar nombres de propiedades requeridas
      properties: {
        managerId: { type: 'number' }, // Marcar individualmente
      },
    },
  })
  createHito(@Body() newhito: CreateHitoDto) {
    return this.hitoRepository.createHito(newhito);
  }
 /*  @Get('detalle-hitos')
  getDetallePlantaconHitos(@Body("pplantId",ParseIntPipe) pplantId: number){
    return this.hitoRepository.getDetallePlantaconHitos(pplantId)
  } */
}
