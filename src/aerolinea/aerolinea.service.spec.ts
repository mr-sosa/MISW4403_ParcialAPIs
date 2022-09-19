/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { AerolineaService } from './aerolinea.service';
import { AerolineaEntity } from './aerolinea.entity';

describe('AerolineaService', () => {
  let service: AerolineaService;
  let repository: Repository<AerolineaEntity>;
  let aerolineasList: AerolineaEntity[];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AerolineaService],
    }).compile();

    service = module.get<AerolineaService>(AerolineaService);
    repository = module.get<Repository<AerolineaEntity>>(getRepositoryToken(AerolineaEntity));

    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    repository.clear();
    aerolineasList = [];
    for(let i = 0; i < 5; i++){
      const aerolinea: AerolineaEntity = await repository.save({
        nombre: faker.company.name(),
        descripcion: faker.random.words(),
        fechaFundacion: faker.date.past(),
        paginaWeb: faker.internet.url(),
      })
      aerolineasList.push(aerolinea);
    };
  }

  it('findAll should return all aerolineas', async () => {
    const aerolineas: AerolineaEntity[] = await service.findAll();
    expect(aerolineas).not.toBeNull();
    expect(aerolineas).toHaveLength(aerolineasList.length);
  });

  it('findOne should return a aerolinea by id', async () => {
    const storedAerolinea: AerolineaEntity = aerolineasList[0];
    const aerolinea: AerolineaEntity = await service.findOne(storedAerolinea.id);
    expect(aerolinea).not.toBeNull();
    expect(aerolinea.nombre).toEqual(storedAerolinea.nombre);
    expect(aerolinea.descripcion).toEqual(storedAerolinea.descripcion);
    expect(aerolinea.fechaFundacion).toEqual(storedAerolinea.fechaFundacion);
    expect(aerolinea.paginaWeb).toEqual(storedAerolinea.paginaWeb);
  });

  it('findOne should throw an exception for an invalid airline', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The airline with the given id was not found")
  });

  it('create should return a new airline', async () => {
    const aerolinea: AerolineaEntity = {
      id: "",
      nombre: faker.company.name(),
      descripcion: faker.random.words(3),
      fechaFundacion: faker.date.past(),
      paginaWeb: faker.internet.url(),
      aeropuertos: null,
    }

    const newAerolinea: AerolineaEntity = await service.create(aerolinea);
    expect(newAerolinea).not.toBeNull();

    const storedAerolinea: AerolineaEntity = await repository.findOne({where: {id: newAerolinea.id}})
    expect(aerolinea).not.toBeNull();
    expect(aerolinea.fechaFundacion.getDate()).toBeLessThan(Date.now());
    expect(aerolinea.nombre).toEqual(storedAerolinea.nombre);
    expect(aerolinea.descripcion).toEqual(storedAerolinea.descripcion);
    expect(aerolinea.fechaFundacion).toEqual(storedAerolinea.fechaFundacion);
    expect(aerolinea.paginaWeb).toEqual(storedAerolinea.paginaWeb);
  });

  it('update should modify a aerolinea', async () => {
    const aerolinea: AerolineaEntity = aerolineasList[0];
    aerolinea.nombre = faker.company.name();
    aerolinea.descripcion = faker.random.words(3);
    aerolinea.fechaFundacion = faker.date.past();
    aerolinea.paginaWeb = faker.internet.url();

    const updatedAerolinea: AerolineaEntity = await service.update(aerolinea.id, aerolinea);
    expect(updatedAerolinea).not.toBeNull();
    const storedAerolinea: AerolineaEntity = await repository.findOne({where:{id: aerolinea.id}})
    expect(storedAerolinea).not.toBeNull();
    expect(aerolinea.fechaFundacion.getDate()).toBeLessThan(Date.now());
    expect(aerolinea.nombre).toEqual(storedAerolinea.nombre);
    expect(aerolinea.descripcion).toEqual(storedAerolinea.descripcion);
    expect(aerolinea.fechaFundacion).toEqual(storedAerolinea.fechaFundacion);
    expect(aerolinea.paginaWeb).toEqual(storedAerolinea.paginaWeb);
  });

  it('update should throw an exception for an invalid airline', async () => {
    let aerolinea: AerolineaEntity = aerolineasList[0];
    aerolinea = {
      ...aerolinea, 
      nombre: faker.company.name(),
      descripcion: faker.random.words(3),
      fechaFundacion: faker.date.past(),
      paginaWeb: faker.internet.url(),
    }
    await expect(() => service.update("0", aerolinea)).rejects.toHaveProperty("message", "The airline with the given id was not found")
  });

  it('delete should remove a aerolinea', async () => {
    const aerolinea: AerolineaEntity = aerolineasList[0];
    await service.delete(aerolinea.id);
     const deletedAerolinea: AerolineaEntity = await repository.findOne({ where: { id: aerolinea.id } })
    expect(deletedAerolinea).toBeNull();
  });

  it('delete should throw an exception for an invalid airline', async () => {
    const aerolinea: AerolineaEntity = aerolineasList[0];
    await service.delete(aerolinea.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The airline with the given id was not found")
  });
});
