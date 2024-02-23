import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Plants } from './plants.entity';
import { Pplants } from './ppants.entity';
import { Zones } from './zones.entity';

@Entity()
export class Managers {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  nombre: string;
  @Column({ nullable: true })
  zonesId: number;
  
  //realacion con la tabla de preguntas
  

  @OneToMany(() => Pplants, (pplant) => pplant.managers)
  pplants: Pplants[];

  @ManyToOne(() => Zones, (zone) => zone.managers)
  zones: Managers;
}
