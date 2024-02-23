import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pplants } from 'src/database/entities/ppants.entity';
import { Repository } from 'typeorm';
import { CreatepplantsDto } from './dto/create-pplants.dto';
import { Users } from 'src/database/entities/users.entity';
import { CreateplantarDto } from './dto/create-plantar.dto';
import { HitosService } from 'src/hitos/hitos.service';

@Injectable()
export class InvernaderosService {
  constructor(
    @InjectRepository(Pplants) private pplantRepository: Repository<Pplants>,
    /* private hitosService: HitosService */
  ) {}
  createPplant(pplant: CreatepplantsDto) {
    const newPplnat = this.pplantRepository.create(pplant);
    return this.pplantRepository.save(newPplnat);
  }
  createPlantar(pplant: CreateplantarDto) {
    const newPplnat = this.pplantRepository.create(pplant);
    return this.pplantRepository.save(newPplnat);
  }
  /* relations: ['users'] */
  getePplnat(id: number) {
    return this.pplantRepository.find({
      where: { users: { id: id } },
      relations: ['zones', 'plants', 'plants.categories'],
    });
  }
  getePplnatByid(id: number) {
    return this.pplantRepository.findOne({
      where: { id },
     
    });
  }
  /*  async getePplantwithHitos(id: number){
    const pplnat = await this.pplantRepository.findOne({ where:{id},relations: ['zones','plants']})
    const hitos = await this.hitosService.geteHitosByPplant(id)
    const data = {"planta":pplnat,"hitos":hitos}
    return data
    
 }
 */

  getePplnatAgri(id: number) {
    return this.pplantRepository.find({
      where: { managers: { id: id } },
      relations: ['zones', 'plants', 'plants.categories' ,'users'],
    });
  }
}
