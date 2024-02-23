import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiendaController } from './tienda.controller';
import { TiendaService } from './tienda.service';
import { Plants } from 'src/database/entities/plants.entity';
import { Categories } from 'src/database/entities/cetegories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plants, Categories])],
  controllers: [TiendaController],
  providers: [TiendaService],
})
export class TiendaModule {}
