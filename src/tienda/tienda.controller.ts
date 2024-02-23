import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('tienda')
@ApiBearerAuth()
@Controller('tienda')
//@UseGuards(JwtAuthGuard)
export class TiendaController {
  constructor(private readonly tiendaService: TiendaService) {}
  
  @Get('popular-plants')
  async getfindPopularPlants() {
    return await this.tiendaService.findPopularPlants();
  }

  @Get('plants-category/:categoriesId')
  async findAll(@Param('categoriesId') categoriesId: number) {
    return await this.tiendaService.findAll(categoriesId);
  }

  @Get("categories")
  getCategories(){
    return this.tiendaService.getAllCategories();
  }

}
