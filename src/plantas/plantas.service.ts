import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';

import { Plants } from 'src/database/entities/plants.entity';
import { HitosService } from 'src/hitos/hitos.service';
import { InvernaderosService } from 'src/invernaderos/invernaderos.service';
import { UsersService } from 'src/users/users.service';

import { Repository } from 'typeorm';

@Injectable()
export class PlantasService {
  constructor(
    @InjectRepository(Plants)
    private readonly plantRepository: Repository<Plants>,
    private usersService: UsersService,
    private pplantsService: InvernaderosService,
    /* private hitosService: HitosService */
  ) {}
  geteplantId(id: number) {
    return this.plantRepository.find({
      where: { id: id },relations: ['categories']
    });
  }
  async geteplantIdandPrice(id: number, userId: number) {
    const numberPplants = (await this.pplantsService.getePplnat(userId)).length;
    const infoUser = await this.usersService.geteUserById(userId);

    if(!infoUser.plansId){
      throw new HttpException("Tu plan no permite comprar plantas...",HttpStatus.BAD_REQUEST)
    }

    if (infoUser.plansId == 1) {
      return numberPplants >= 1 ? { precio: 10, discount: 0 } : {precio: 10, discount: 10};
    }
    if (infoUser.plansId == 2) {
      return numberPplants >= 3 ? { precio: 7, discount: 0 } : {precio: 7, discount: 7};
    } 
    if (infoUser.plansId == 3) {
      return numberPplants >= 5 ? {precio: 5, discount: 0} : {precio: 5, discount: 5} ;
    } 
  }

 /*    async getePplantwithHitos(id: number){
    const pplnat = await this.pplantsService.getePplnat(id) 
    const hitos = await this.hitosService.geteHitosByPplant(id)
    const data = {"planta":pplnat,"hitos":hitos}
    return data
    
 } */

}
