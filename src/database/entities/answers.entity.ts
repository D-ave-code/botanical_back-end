import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Answers{
    @PrimaryGeneratedColumn()
    id:number
    @Column({nullable:true})
    respuesta:string
}