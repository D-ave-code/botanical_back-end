import { Module, forwardRef } from '@nestjs/common';
import { InvernaderosController } from './invernaderos.controller';
import { InvernaderosService } from './invernaderos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pplants } from 'src/database/entities/ppants.entity';
import { Users } from 'src/database/entities/users.entity';
import { UsersModule } from 'src/users/users.module';
import { HitosModule } from 'src/hitos/hitos.module';


@Module({
  imports: [TypeOrmModule.forFeature([Pplants]),UsersModule],
  controllers: [InvernaderosController],
  providers: [InvernaderosService],
  exports: [InvernaderosService]
})
export class InvernaderosModule {}
