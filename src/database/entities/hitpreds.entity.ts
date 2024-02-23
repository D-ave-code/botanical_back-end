import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Bills } from './bills.entity';
import { Prices } from './prices.entity';

@Entity()
export class Hitpreds {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  hito: string;


}
