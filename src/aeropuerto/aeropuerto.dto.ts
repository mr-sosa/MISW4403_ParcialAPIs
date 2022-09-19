/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, Length} from 'class-validator';

export class AeropuertoDto {

    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    @Length(3,3)
    readonly codigo: string;

    @IsNotEmpty()
    @IsString()
    readonly pais: string;

    @IsNotEmpty()
    @IsString()
    readonly ciudad: string; 
}
