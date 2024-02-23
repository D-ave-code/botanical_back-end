import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/users.entity';
import { UsersService } from './users.service';
import { Plans } from 'src/database/entities/plans.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
