/* eslint-disable prettier/prettier */
import { Controller, UseInterceptors, Body, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { AerolineasAeropuertosService } from './aerolineas-aeropuertos.service';
import { AeropuertoDto } from '../aeropuerto/aeropuerto.dto';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';

@Controller('airlines')
@UseInterceptors(BusinessErrorsInterceptor)
export class AerolineasAeropuertosController {

    constructor(private readonly aerolineasAeropuertosService: AerolineasAeropuertosService){}

    @Post(':aerolineaId/airports/:aeropuertoId')
    async addAeropuertoMuseum(@Param('aerolineaId') aerolineaId: string, @Param('aeropuertoId') aeropuertoId: string){
        return await this.aerolineasAeropuertosService.addAirportToAirline(aerolineaId, aeropuertoId);
    }

    @Get(':aerolineaId/airports/:aeropuertoId')
    async findAeropuertoByMuseumIdAeropuertoId(@Param('aerolineaId') aerolineaId: string, @Param('aeropuertoId') aeropuertoId: string){
       return await this.aerolineasAeropuertosService.findAirportFromAirline(aerolineaId, aeropuertoId);
    }

    @Get(':aerolineaId/airports')
    async findAeropuertosByMuseumId(@Param('aerolineaId') aerolineaId: string){
       return await this.aerolineasAeropuertosService.findAirportsFromAirline(aerolineaId);
    }

    @Put(':aerolineaId/airports')
    async associateAeropuertosMuseum(@Body() aeropuertosDto: AeropuertoDto[], @Param('aerolineaId') aerolineaId: string){
       const aeropuertos = plainToInstance(AeropuertoEntity, aeropuertosDto)
       return await this.aerolineasAeropuertosService.updateAirportsFromAirline(aerolineaId, aeropuertos);
    }

    @Delete(':aerolineaId/airports/:aeropuertoId')
    @HttpCode(204)
    async deleteAeropuertoMuseum(@Param('aerolineaId') aerolineaId: string, @Param('aeropuertoId') aeropuertoId: string){
       return await this.aerolineasAeropuertosService.deleteAirportFromAirline(aerolineaId, aeropuertoId);
    }
}
