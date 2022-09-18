/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from 'class-validator';

export class AeropuertoDto {

    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    readonly codigo: string;

    @IsNotEmpty()
    @IsString()
    readonly pais: string;

    @IsNotEmpty()
    @IsString()
    readonly ciudad: string; 
}
