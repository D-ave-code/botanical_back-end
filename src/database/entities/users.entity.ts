import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Bills } from './bills.entity';
import { Plans } from './plans.entity';
import { Pplants } from './ppants.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  token_not: string;//registro no va
  @Column({ nullable: true })
  uid: string;
  @Column({ nullable: true })
  nombre: string;
  @Column({ nullable: true })
  apellido: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  telefono: string;
  /* @Column({ nullable: true })
  rol: number; */
  @Column({ type: 'date' ,nullable: true})
  f_nac: Date;
  /* @Column({ nullable: true })
  url_foto: string; */
  @Column({ nullable: true })
  genero: string;
  /* @Column()
  password: string; */

  @Column({ nullable: true })
  plansId: number;

  
  //relaciones


  @ManyToOne(() => Plans, (plan) => plan.users)
  plans: Plans;
  @OneToMany(() => Bills, (bills) => bills.users)
  bills: Bills[];
  @OneToMany(() => Pplants, (pplant) => pplant.users)
  pplants: Pplants[];
}
