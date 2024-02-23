import { Body, Controller, Get, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PlantasService } from './plantas.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Post } from '@nestjs/common/decorators';
@ApiTags('Plantas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('plantas')
export class PlantasController {
    constructor(private plantaRepository: PlantasService) {}
    @Post()
    @ApiBody({
        schema: {
          required: ['plantsId'], // Listar nombres de propiedades requeridas
          properties: {
            plantsId: { type: 'number' }, // Marcar individualmente
          },
        },
      })
    getPlant(@Body('plantsId', ParseIntPipe) plantsId: number){
       
        return this.plantaRepository.geteplantId(plantsId)
    }
    @Post('precios')
    @ApiBody({
        schema: {
          required: ['plantsId','userId'], // Listar nombres de propiedades requeridas
          properties: {
            plantsId: { type: 'number' },
            userId: { type: 'number' } // Marcar individualmente
          },
        },
      })
    getPlantByidandPrice(@Body('plantsId', ParseIntPipe) plantsId: number, @Body('userId', ParseIntPipe) userId: number){
       
        return this.plantaRepository.geteplantIdandPrice(plantsId,userId)
    }
}
