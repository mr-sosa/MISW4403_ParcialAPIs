/* eslint-disable prettier/prettier */
import { AerolinaEntity } from '../aerolinea/aerolina.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AeropuertoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    codigo: string;

    @Column()
    pais: string;

    @Column()
    ciudad: string; 

    @ManyToMany(()=> AerolinaEntity, aerolina => aerolina.aeropuertos)
    aerolinas: AerolinaEntity[];
}
