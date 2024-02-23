import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Bills } from './bills.entity';
import { Categories } from './cetegories.entity';
import { Pplants } from './ppants.entity';
import { Managers } from './managers.entity';

@Entity()
export class Plants {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  nombre: string;
  @Column({ nullable: true })
  nombre_c: string;
  @Column({ nullable: true })
  descripcion: string;
  @Column({ nullable: true })
  url_foto: string;
  @Column({ nullable: true })
  categoriesId: number;

  
  //relaciones
  @OneToMany(() => Bills, (bills) => bills.plants)
  bills: Bills[];

  @ManyToOne(() => Categories, categories => categories.plants)
  categories: Categories[];
  @OneToMany(() => Pplants, (pplant) => pplant.plants)
  pplants: Pplants[];
  
}
