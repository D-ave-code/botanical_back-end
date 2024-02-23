import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Plants } from "./plants.entity";

@Entity()
export class Categories{
    @PrimaryGeneratedColumn()
    id:number
    @Column({nullable:true})
    nombre:string
    @OneToMany(() => Plants, (plants) => plants.categories)
    plants: Plants[];
}