import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bills } from 'src/database/entities/bills.entity';
import { UsersModule } from 'src/users/users.module';
import { InvernaderosModule } from 'src/invernaderos/invernaderos.module';
import { PlantasModule } from 'src/plantas/plantas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bills]),UsersModule,InvernaderosModule,PlantasModule],
  providers: [PagosService],
  controllers: [PagosController],
  exports: [PagosService],
})
export class PagosModule {}
