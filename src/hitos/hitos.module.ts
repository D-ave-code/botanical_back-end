import { Module, forwardRef } from '@nestjs/common';
import { HitosController } from './hitos.controller';
import { HitosService } from './hitos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hitos } from 'src/database/entities/hitos.entity';

import { InvernaderosModule } from 'src/invernaderos/invernaderos.module';

import { PlantasModule } from 'src/plantas/plantas.module';
import { InvernaderosService } from 'src/invernaderos/invernaderos.service';
import { UsersModule } from 'src/users/users.module';
import { NotificacionesModule } from 'src/notificaciones/notificaciones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hitos]),
    InvernaderosModule,
    PlantasModule,UsersModule,NotificacionesModule
  ],
  controllers: [HitosController],
  providers: [HitosService],
  exports: [HitosService],
})
export class HitosModule {}
