import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import dataSource from 'src/database/data-source';
import { Users } from 'src/database/entities/users.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterDto } from './dto/registerdt0.dto';
import { UpdateTokenDto } from './dto/update-tok.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}
  createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
  registerUser(user: RegisterDto) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  geteUsers() {
    return this.userRepository.find({ relations: ['plans'] });
  }
   geteUser(uid_:string) {
    
   
    return this.userRepository.findOne({where:{uid:uid_}});
  }
  geteUserById(id:number) {
    
    return this.userRepository.findOne({where:{id:id}});
  }
  updatePlanUser(id:number, plansId: number ) {
    
    console.log(id, plansId);
    return this.userRepository.update({id}, {plansId:plansId});
  }
   updateToken_notUser(user: UpdateTokenDto) {
  
      return this.userRepository.update(user.id, {token_not : user.token_not});
          
  }

}

