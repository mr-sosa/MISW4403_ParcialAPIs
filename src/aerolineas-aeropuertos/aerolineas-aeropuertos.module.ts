/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineasAeropuertosService } from './aerolineas-aeropuertos.service';
import { AerolineaEntity } from '../aerolinea/aerolinea.entity';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';
import { AerolineasAeropuertosController } from './aerolineas-aeropuertos.controller';

@Module({
  providers: [AerolineasAeropuertosService],
  imports: [TypeOrmModule.forFeature([AerolineaEntity, AeropuertoEntity])],
  controllers: [AerolineasAeropuertosController]
})
export class AerolineasAeropuertosModule {}
