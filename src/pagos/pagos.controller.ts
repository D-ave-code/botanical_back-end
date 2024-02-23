import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateBillsDto } from './dto/createbillsdto.dto';
import { PagosService } from './pagos.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@ApiTags('Pagos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pagos')
export class PagosController {
    constructor(private billsRepository: PagosService) {}

    @Post('factura')
    @ApiBody({
        schema: {
          required: ['userId','plantId','tipo_compra','precio','descuento'], // Listar nombres de propiedades requeridas
          properties: {
            userId: { type: 'number', },
            plantId: { type: 'number', },
            tipo_compra: { type: 'string', }, 
            precio: { type: 'number', }, 
            descuento: { type: 'number', }, // Marcar individualmente
          },
        },
      })
    async getePplnat(@Body() bill: CreateBillsDto){
       
        return this.billsRepository.createBill(bill)
    }

    @Post('plan')
    @ApiBody({
      schema: {
        required: ['usersId','tipo_compra','precio','descuento',"f_compra",'plansId'], // Listar nombres de propiedades requeridas
        properties: {
          usersId: { type: 'number', },
          f_compra: { type: 'Date', },
          plansId: { type: 'number', },
          tipo_compra: { type: 'string', }, 
          precio: { type: 'number', }, 
          descuento: { type: 'number', }, // Marcar individualmente
        },
      },
    })
    buyPlan(@Body() bill: CreateBillsDto){
      return this.billsRepository.buildPlan(bill)
    }

    @Get('historial/:id')
       getHistorial(@Param('id') id: number){
      return this.billsRepository.getBills(id)
    }
}
