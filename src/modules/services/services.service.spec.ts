import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import {
  UpdateResponse,
  DeleteResponse,
} from '../../common/interfaces/repository-response';

const findResponse = [
  new Service({
    id: 1,
    name: 'name-1',
    description: 'description-1',
    recommendedPrice: 1.1,
    providerId: 1,
  }),
  new Service({
    id: 2,
    name: 'name-2',
    description: 'description-2',
    recommendedPrice: 2.2,
    providerId: 2,
  }),
  new Service({
    id: 3,
    name: 'name-2',
    description: 'description-2',
    recommendedPrice: 2.2,
    providerId: 2,
  }),
];

const findOneResponse = new Service({
  id: 1,
  name: 'name-1',
  description: 'description-1',
  recommendedPrice: 1.1,
  providerId: 1,
});

const createResponse = new Service({
  id: 1,
  name: 'name-1',
  description: 'description-1',
  recommendedPrice: 1.1,
  providerId: 1,
});

const createdResponse = { id: 1 };

const saveResponse = new Service({
  id: 1,
  name: 'name-1',
  description: 'description-1',
  recommendedPrice: 1.1,
  providerId: 1,
});

const updateResponse = new UpdateResponse({
  generatedMaps: [],
  raw: [],
  affected: 1,
});

const deleteResponse = new DeleteResponse({ raw: [], affected: 1 });

describe('ServicesService', () => {
  let sectorsService: ServicesService;
  let sectorsRepository: Repository<Service>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: getRepositoryToken(Service),
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

    sectorsService = module.get<ServicesService>(ServicesService);
    sectorsRepository = module.get<Repository<Service>>(
      getRepositoryToken(Service),
    );
  });

  it('should be defined', () => {
    expect(sectorsService).toBeDefined();
    expect(sectorsRepository).toBeDefined();
  });

  describe('find', () => {
    it('should return a list of sector entities successfully', async () => {
      const result = await sectorsService.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(sectorsRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(sectorsRepository, 'find').mockRejectedValueOnce(new Error());
      expect(sectorsService.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a sector entity successfully', async () => {
      const id = 1;
      const result = await sectorsService.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(sectorsRepository.findOne).toHaveBeenCalledTimes(1);
      expect(sectorsRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should throw an exception', () => {
      jest.spyOn(sectorsService, 'findOne').mockRejectedValueOnce(new Error());
      expect(sectorsService.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateServiceDto = {
      name: 'name-1',
      description: 'description-1',
      recommendedPrice: 1.1,
      providerId: 1,
    };

    it('should create a new sector entity successfuly', async () => {
      const result = await sectorsService.create(body);

      expect(result).toEqual(createdResponse);
      expect(sectorsRepository.create).toHaveBeenCalledTimes(1);
      expect(sectorsRepository.save).toHaveBeenCalledTimes(1);
      expect(sectorsRepository.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(sectorsRepository, 'save').mockRejectedValueOnce(new Error());
      expect(sectorsService.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateServiceDto = {
      name: 'name-1',
      description: 'description-1',
      recommendedPrice: 1.1,
      providerId: 1,
    };

    it('should update a sector entity successfuly', async () => {
      const result = await sectorsService.update(id, body);

      expect(result).toBeUndefined();
      expect(sectorsRepository.update).toHaveBeenCalledTimes(1);
      expect(sectorsRepository.update).toHaveBeenCalledWith({ id }, body);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(sectorsRepository, 'update')
        .mockRejectedValueOnce(new Error());
      expect(sectorsService.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a sector entity successfuly', async () => {
      const id = 1;

      const result = await sectorsService.remove(id);

      expect(result).toBeUndefined();
      expect(sectorsRepository.delete).toHaveBeenCalledTimes(1);
      expect(sectorsRepository.delete).toHaveBeenCalledWith({ id });
    });

    it('should throw an exception', () => {
      const id = 1;

      jest
        .spyOn(sectorsRepository, 'delete')
        .mockRejectedValueOnce(new Error());
      expect(sectorsService.remove(id)).rejects.toThrowError();
    });
  });
});
