import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProvidersService } from './providers.service';
import { Provider } from './entities/provider.entity';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import {
  UpdateResponse,
  DeleteResponse,
} from '../../common/interfaces/repository-response';

const findResponse = [
  new Provider({
    id: 1,
    userId: 1,
    taxId: 'teste-1',
    sectorId: 1,
  }),
  new Provider({
    id: 2,
    userId: 2,
    taxId: 'teste-2',
    sectorId: 2,
  }),
  new Provider({
    id: 3,
    userId: 3,
    taxId: 'teste-3',
    sectorId: 3,
  }),
];

const findOneResponse = new Provider({
  id: 1,
  userId: 1,
  taxId: 'teste-1',
  sectorId: 1,
});

const createResponse = new Provider({
  id: 1,
  userId: 1,
  taxId: 'teste-1',
  sectorId: 1,
});

const createdResponse = { id: 1 };

const saveResponse = new Provider({
  id: 1,
  userId: 1,
  taxId: 'teste-1',
  sectorId: 1,
});

const updateResponse = new UpdateResponse({
  generatedMaps: [],
  raw: [],
  affected: 1,
});

const deleteResponse = new DeleteResponse({ raw: [], affected: 1 });

describe('ProvidersService', () => {
  let citiesService: ProvidersService;
  let citiesRepository: Repository<Provider>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvidersService,
        {
          provide: getRepositoryToken(Provider),
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

    citiesService = module.get<ProvidersService>(ProvidersService);
    citiesRepository = module.get<Repository<Provider>>(
      getRepositoryToken(Provider),
    );
  });

  it('should be defined', () => {
    expect(citiesService).toBeDefined();
    expect(citiesRepository).toBeDefined();
  });

  describe('find', () => {
    it('should return a list of sector entities successfully', async () => {
      const result = await citiesService.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(citiesRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(citiesRepository, 'find').mockRejectedValueOnce(new Error());
      expect(citiesService.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a sector entity successfully', async () => {
      const id = 1;
      const result = await citiesService.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(citiesRepository.findOne).toHaveBeenCalledTimes(1);
      expect(citiesRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should throw an exception', () => {
      jest.spyOn(citiesService, 'findOne').mockRejectedValueOnce(new Error());
      expect(citiesService.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateProviderDto = {
      userId: 1,
      taxId: 'teste-1',
      sectorId: 1,
    };

    it('should create a new sector entity successfuly', async () => {
      const result = await citiesService.create(body);

      expect(result).toEqual(createdResponse);
      expect(citiesRepository.create).toHaveBeenCalledTimes(1);
      expect(citiesRepository.save).toHaveBeenCalledTimes(1);
      expect(citiesRepository.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(citiesRepository, 'save').mockRejectedValueOnce(new Error());
      expect(citiesService.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateProviderDto = {
      taxId: 'teste-1',
      sectorId: 1,
    };

    it('should update a sector entity successfuly', async () => {
      const result = await citiesService.update(id, body);

      expect(result).toBeUndefined();
      expect(citiesRepository.update).toHaveBeenCalledTimes(1);
      expect(citiesRepository.update).toHaveBeenCalledWith({ id }, body);
    });

    it('should throw an exception', () => {
      jest.spyOn(citiesRepository, 'update').mockRejectedValueOnce(new Error());
      expect(citiesService.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a sector entity successfuly', async () => {
      const id = 1;

      const result = await citiesService.remove(id);

      expect(result).toBeUndefined();
      expect(citiesRepository.delete).toHaveBeenCalledTimes(1);
      expect(citiesRepository.delete).toHaveBeenCalledWith({ id });
    });

    it('should throw an exception', () => {
      const id = 1;

      jest.spyOn(citiesRepository, 'delete').mockRejectedValueOnce(new Error());
      expect(citiesService.remove(id)).rejects.toThrowError();
    });
  });
});
