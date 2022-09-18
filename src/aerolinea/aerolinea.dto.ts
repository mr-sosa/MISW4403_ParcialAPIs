/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, IsDateString, IsUrl} from 'class-validator';

export class AerolineaDto {
    
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    readonly descripcion: string;

    @IsNotEmpty()
    @IsDateString({ strict: true } as any)
    readonly fechaFundacion: Date;

    @IsNotEmpty()
    @IsUrl()
    readonly paginaWeb: string;
}
