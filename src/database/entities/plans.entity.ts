import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Bills } from './bills.entity';
import { Prices } from './prices.entity';
import { Users } from './users.entity';

@Entity()
export class Plans {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  nombre: string;
  @Column({ type: 'float' })
  precio: number;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ nullable: true })
  pricesId: number;
  //relaciones
  @OneToMany(() => Bills, (bills) => bills.plants)
  bills: Bills[];
  @ManyToOne(() => Prices, price => price.plans)
  prices: Prices;
 

  @OneToMany(() => Users, (user) => user.plans)
    users: Users[];

}
