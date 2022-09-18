/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AeropuertoService } from './aeropuerto.service';

@Module({
  providers: [AeropuertoService],
})
export class AeropuertoModule {}
