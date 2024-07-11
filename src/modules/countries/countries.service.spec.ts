import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import {
  UpdateResponse,
  DeleteResponse,
} from '../../common/interfaces/repository-response';

const findResponse = [
  new Country({
    id: 1,
    name: 'teste-1',
    isocode: 'T1',
    phonecode: '+51',
  }),
  new Country({
    id: 2,
    name: 'teste-2',
    isocode: 'T2',
    phonecode: '+52',
  }),
  new Country({
    id: 3,
    name: 'teste-3',
    isocode: 'T3',
    phonecode: '+53',
  }),
];
const findOneResponse = new Country({
  id: 1,
  name: 'teste-1',
  isocode: 'TT',
  phonecode: '+55',
});
const createResponse = new Country({
  id: 1,
  name: 'teste-1',
  isocode: 'TT',
  phonecode: '+55',
});
const createdResponse = { id: 1 };
const saveResponse = new Country({
  id: 1,
  name: 'teste-1',
  isocode: 'TT',
  phonecode: '+55',
});
const updateResponse = new UpdateResponse({
  generatedMaps: [],
  raw: [],
  affected: 1,
});
const deleteResponse = new DeleteResponse({ raw: [], affected: 1 });

describe('CountriesService', () => {
  let countriesService: CountriesService;
  let countriesRepository: Repository<Country>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        {
          provide: getRepositoryToken(Country),
          useValue: {
            find: jest.fn().mockResolvedValue(findResponse),
            findOne: jest.fn().mockResolvedValue(findOneResponse),
            create: jest.fn().mockResolvedValue(createResponse),
            save: jest.fn().mockResolvedValue(saveResponse),
            update: jest.fn().mockResolvedValue(updateResponse),
            delete: jest.fn().mockResolvedValue(deleteResponse),
          },
        },
      ],
    }).compile();

    countriesService = module.get<CountriesService>(CountriesService);
    countriesRepository = module.get<Repository<Country>>(
      getRepositoryToken(Country),
    );
  });

  it('should be defined', () => {
    expect(countriesService).toBeDefined();
    expect(countriesRepository).toBeDefined();
  });

  describe('find', () => {
    it('should return a list of sector entities successfully', async () => {
      const result = await countriesService.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(countriesRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(countriesRepository, 'find')
        .mockRejectedValueOnce(new Error());
      expect(countriesService.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a sector entity successfully', async () => {
      const id = 1;
      const result = await countriesService.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(countriesRepository.findOne).toHaveBeenCalledTimes(1);
      expect(countriesRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should throw an exception', () => {
      jest
        .spyOn(countriesService, 'findOne')
        .mockRejectedValueOnce(new Error());
      expect(countriesService.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new sector entity successfuly', async () => {
      const body: CreateCountryDto = {
        name: 'teste-1',
      };

      const result = await countriesService.create(body);

      expect(result).toEqual(createdResponse);
      expect(countriesRepository.create).toHaveBeenCalledTimes(1);
      expect(countriesRepository.save).toHaveBeenCalledTimes(1);
      expect(countriesRepository.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      const body: CreateCountryDto = {
        name: 'teste-1',
      };

      jest
        .spyOn(countriesRepository, 'save')
        .mockRejectedValueOnce(new Error());
      expect(countriesService.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a sector entity successfuly', async () => {
      const id = 1;

      const body: UpdateCountryDto = {
        name: 'teste-1.1',
      };

      const result = await countriesService.update(id, body);

      expect(result).toBeUndefined();
      expect(countriesRepository.update).toHaveBeenCalledTimes(1);
      expect(countriesRepository.update).toHaveBeenCalledWith({ id }, body);
    });

    it('should throw an exception', () => {
      const id = 1;

      const body: UpdateCountryDto = {
        name: 'teste-1.1',
      };

      jest
        .spyOn(countriesRepository, 'update')
        .mockRejectedValueOnce(new Error());
      expect(countriesService.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a sector entity successfuly', async () => {
      const id = 1;

      const result = await countriesService.remove(id);

      expect(result).toBeUndefined();
      expect(countriesRepository.delete).toHaveBeenCalledTimes(1);
      expect(countriesRepository.delete).toHaveBeenCalledWith({ id });
    });

    it('should throw an exception', () => {
      const id = 1;

      jest
        .spyOn(countriesRepository, 'delete')
        .mockRejectedValueOnce(new Error());
      expect(countriesService.remove(id)).rejects.toThrowError();
    });
  });
});
