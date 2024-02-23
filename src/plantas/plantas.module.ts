import { Module } from '@nestjs/common';
import { PlantasService } from './plantas.service';
import { PlantasController } from './plantas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plants } from 'src/database/entities/plants.entity';
import { InvernaderosService } from 'src/invernaderos/invernaderos.service';
import { InvernaderosModule } from 'src/invernaderos/invernaderos.module';
import { UsersModule } from 'src/users/users.module';
import { HitosModule } from 'src/hitos/hitos.module';
import { Categories } from 'src/database/entities/cetegories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plants]),InvernaderosModule,UsersModule],
  providers: [PlantasService],
  controllers: [PlantasController],
  exports: [PlantasService],
})
export class PlantasModule {}
