import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Plants } from './plants.entity';
import { Users } from './users.entity';
import { Plans } from './plans.entity';
import { Pplants } from './ppants.entity';

@Entity()
export class Hitos {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  descripcion: string;
  @Column({ nullable: true })
  des_corta: string;
  
  @Column({ type: 'date' })
  f_hito: Date;
  @Column({ nullable: true })
  pplantsId: number;
 /*  @Column({ nullable: true })
  url_foto: string; */
  
  //relaciones
  @ManyToOne(() => Pplants, pplant => pplant.hitos)
  pplants: Pplants;
}
