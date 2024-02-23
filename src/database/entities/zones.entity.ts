import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Bills } from './bills.entity';
import { Prices } from './prices.entity';
import { Pplants } from './ppants.entity';
import { Managers } from './managers.entity';

@Entity()
export class Zones {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  nombre: string;
  @Column({ nullable: true })
  descripcion: string;
  @Column({ nullable: true })
  coordenadas: string;

  //relaciones
  @OneToMany(() => Pplants, (pplant) => pplant.zones)
  pplants: Pplants;
  @OneToMany(() => Managers, (manager) => manager.zones)
  managers: Managers[];
}
