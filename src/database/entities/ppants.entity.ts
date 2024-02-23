import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Bills } from './bills.entity';
import { Plans } from './plans.entity';
import { Hitos } from './hitos.entity';
import { Zones } from './zones.entity';
import { Plants } from './plants.entity';
import { Users } from './users.entity';
import { Managers } from './managers.entity';

@Entity()
export class Pplants {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  apodo: string;
  /* @Column({ nullable: true })
  encargado: number; */
//campos relaciones
@Column({ nullable: true })
zonesId: number;
  @Column({ nullable: true })
  plantsId: number;
  @Column({ nullable: true })
  usersId: number;
  @Column({ nullable: true })
  managersId: number;


  //relaciones
  @OneToMany(() => Hitos, (hito) => hito.pplants)
  hitos: Hitos[];
  @ManyToOne(() => Zones, (zone) => zone.pplants)
  zones: Zones[];
  @ManyToOne(() => Plants, plant => plant.pplants)
  plants: Plants;
  @ManyToOne(() => Users, user => user.pplants)
  users: Users;
  @ManyToOne(() => Managers, (manager) => manager.pplants)
  managers: Managers;
  
}
