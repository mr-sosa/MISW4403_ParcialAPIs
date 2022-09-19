/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { AeropuertoService } from './aeropuerto.service';
import { AeropuertoEntity } from './aeropuerto.entity';

describe('AeropuertoService', () => {
  let service: AeropuertoService;
  let repository: Repository<AeropuertoEntity>;
  let aeropuertosList: AeropuertoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AeropuertoService],
    }).compile();

    service = module.get<AeropuertoService>(AeropuertoService);
    repository = module.get<Repository<AeropuertoEntity>>(getRepositoryToken(AeropuertoEntity));

    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    repository.clear();
    aeropuertosList = [];
    for(let i = 0; i < 5; i++){
      const aeropuerto: AeropuertoEntity = await repository.save({
        nombre: faker.company.name(),
        codigo: faker.random.alpha(3),
        pais: faker.address.country(),
        ciudad: faker.address.city(),
      })
      aeropuertosList.push(aeropuerto);
    };
  }

  it('findAll should return all airports', async () => {
    const aeropuertos: AeropuertoEntity[] = await service.findAll();
    expect(aeropuertos).not.toBeNull();
    expect(aeropuertos).toHaveLength(aeropuertosList.length);
  });

  it('findOne should return a airport by id', async () => {
    const storedAeropuerto: AeropuertoEntity = aeropuertosList[0];
    const aeropuerto: AeropuertoEntity = await service.findOne(storedAeropuerto.id);
    expect(aeropuerto).not.toBeNull();
    expect(aeropuerto.nombre).toEqual(storedAeropuerto.nombre);
    expect(aeropuerto.codigo).toEqual(storedAeropuerto.codigo);
    expect(aeropuerto.pais).toEqual(storedAeropuerto.pais);
    expect(aeropuerto.ciudad).toEqual(storedAeropuerto.ciudad);
  });

  it('findOne should throw an exception for an invalid airport', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The airport with the given id was not found")
  });

  it('create should return a new airport', async () => {
    const aeropuerto: AeropuertoEntity = {
      id: "",
      nombre: faker.company.name(),
      codigo: faker.random.alpha(3),
      pais: faker.address.country(),
      ciudad: faker.address.city(),
      aerolineas: null,
    }

    const newAeropuerto: AeropuertoEntity = await service.create(aeropuerto);
    expect(newAeropuerto).not.toBeNull();

    const storedAeropuerto: AeropuertoEntity = await repository.findOne({where: {id: newAeropuerto.id}})
    expect(aeropuerto).not.toBeNull();
    expect(aeropuerto.codigo.length).toEqual(3);
    expect(aeropuerto.nombre).toEqual(storedAeropuerto.nombre);
    expect(aeropuerto.codigo).toEqual(storedAeropuerto.codigo);
    expect(aeropuerto.pais).toEqual(storedAeropuerto.pais);
    expect(aeropuerto.ciudad).toEqual(storedAeropuerto.ciudad);
  });

  it('update should modify a airport', async () => {
    const aeropuerto: AeropuertoEntity = aeropuertosList[0];
    aeropuerto.nombre = faker.company.name();
    aeropuerto.codigo = faker.random.alpha(3);
    aeropuerto.pais = faker.address.country();
    aeropuerto.ciudad = faker.address.city();

    const updatedAeropuerto: AeropuertoEntity = await service.update(aeropuerto.id, aeropuerto);
    expect(updatedAeropuerto).not.toBeNull();
    const storedAeropuerto: AeropuertoEntity = await repository.findOne({where:{id: aeropuerto.id}})
    expect(storedAeropuerto).not.toBeNull();
    expect(aeropuerto.codigo.length).toEqual(3);
    expect(aeropuerto.nombre).toEqual(storedAeropuerto.nombre);
    expect(aeropuerto.codigo).toEqual(storedAeropuerto.codigo);
    expect(aeropuerto.pais).toEqual(storedAeropuerto.pais);
    expect(aeropuerto.ciudad).toEqual(storedAeropuerto.ciudad);
  });

  it('update should throw an exception for an invalid airport', async () => {
    let aeropuerto: AeropuertoEntity = aeropuertosList[0];
    aeropuerto = {
      ...aeropuerto, 
      nombre: faker.company.name(),
      codigo: faker.random.words(3),
      pais: faker.address.country(),
      ciudad: faker.address.city(),
    }
    await expect(() => service.update("0", aeropuerto)).rejects.toHaveProperty("message", "The airport with the given id was not found")
  });

  it('delete should remove a aeropuerto', async () => {
    const aeropuerto: AeropuertoEntity = aeropuertosList[0];
    await service.delete(aeropuerto.id);
     const deletedAeropuerto: AeropuertoEntity = await repository.findOne({ where: { id: aeropuerto.id } })
    expect(deletedAeropuerto).toBeNull();
  });

  it('delete should throw an exception for an invalid airport', async () => {
    const aeropuerto: AeropuertoEntity = aeropuertosList[0];
    await service.delete(aeropuerto.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The airport with the given id was not found")
  });
});
