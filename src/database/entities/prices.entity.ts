import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Bills } from './bills.entity';
import { Plans } from './plans.entity';

@Entity()
export class Prices {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'float' })
  precio: number;
  //relaciones
    @OneToMany(() => Plans, (plans) => plans.prices)
    plans: Plans[];

}
