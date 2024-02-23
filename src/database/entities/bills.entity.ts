import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Plants } from './plants.entity';
import { Users } from './users.entity';
import { Plans } from './plans.entity';

@Entity()
export class Bills {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'date' })
  f_compra: Date;
  @Column({ nullable: true })
  tipo_compra: string;
  @Column({ type: 'float' })
  precio: number;
  @Column({ nullable: true, type: 'float' })
  total: number;
  @Column({ nullable: true, type: 'float' })
  descuento: number;
  
//campos relaciones
  @Column({ nullable: true })
  plantsId: number;
  @Column({ nullable: true })
  usersId: number;
  @Column({ nullable: true })
  plansId: number;

  //relaciones
  @ManyToOne(() => Plants, plant => plant.bills)
  plants: Plants;
  @ManyToOne(() => Users, user => user.bills)
  users: Users;
  @ManyToOne(() => Plans, plan => plan.bills)
  plans: Plans;
}
