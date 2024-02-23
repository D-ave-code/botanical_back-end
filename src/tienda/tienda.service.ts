import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plants } from 'src/database/entities/plants.entity';
import { Categories } from 'src/database/entities/cetegories.entity';

@Injectable()
export class TiendaService {
  constructor(
    @InjectRepository(Plants)
    private readonly plantsRepository: Repository<Plants>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>
  ) {}

  async findPopularPlants(): Promise<Plants[]> {
    try {
      const plants = await this.plantsRepository.find({ take: 5, relations: ["categories"] });
      //console.log('Plantas:', plants);
      return plants;
    } catch (error) {
      console.error('Error al Recuperar las Plantas:', error);
      throw error;
    }
  }

  async getAllCategories() {
    return this.categoriesRepository.find();
  }

  async findAll(categori?: number): Promise<Plants[]> {

    return this.plantsRepository.find({where: {categories: {id: categori}}, relations: ["categories"]});
    try {

    
      let queryBuilder = this.plantsRepository.createQueryBuilder('plants');

      if (categori) {
        queryBuilder = queryBuilder.where('plants.categoriesId = :categori', { categori });
      }
      const query = queryBuilder.getQueryAndParameters();
      console.log('Query:', query);
      const plants = await queryBuilder.getMany();
      console.log('Plants:', plants);
      return plants;
    } catch (error) {
      console.error('Error retrieving plants:', error);
      throw error;
    }
  } 
 /*  getPlantsById(id: number){
    return this.plantsRepository.findOne(id);
  } */

}
