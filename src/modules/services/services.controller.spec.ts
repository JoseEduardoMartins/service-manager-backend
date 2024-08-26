import { Test, TestingModule } from '@nestjs/testing';
import {
  DeleteResponse,
  UpdateResponse,
} from '../../common/interfaces/repository-response';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

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
    name: 'name-3',
    description: 'description-3',
    recommendedPrice: 3.3,
    providerId: 3,
  }),
];

const findOneResponse = new Service({
  id: 1,
  name: 'name-1',
  description: 'description-1',
  recommendedPrice: 1.1,
  providerId: 1,
});

const createdResponse = { id: 1 };

const updateResponse = new UpdateResponse({
  generatedMaps: [],
  raw: [],
  affected: 1,
});

const deleteResponse = new DeleteResponse({
  raw: [],
  affected: 1,
});

describe('ServicesController', () => {
  let servicesController: ServicesController;
  let servicesService: ServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [
        {
          provide: ServicesService,
          useValue: {
            find: jest.fn().mockResolvedValue(findResponse),
            findOne: jest.fn().mockResolvedValue(findOneResponse),
            create: jest.fn().mockResolvedValue(createdResponse),
            update: jest.fn().mockResolvedValue(updateResponse),
            remove: jest.fn().mockResolvedValue(deleteResponse),
          },
        },
      ],
    }).compile();

    servicesController = module.get<ServicesController>(ServicesController);
    servicesService = module.get<ServicesService>(ServicesService);
  });

  it('should be defined', () => {
    expect(servicesController).toBeDefined();
    expect(servicesService).toBeDefined();
  });

  describe('find', () => {
    it('should return a service list entity successfully', async () => {
      const result = await servicesController.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(servicesService.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(servicesService, 'find').mockRejectedValueOnce(new Error());
      expect(servicesController.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    const id = 1;

    it('should return a service entity successfully', async () => {
      const result = await servicesController.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(servicesService.findOne).toHaveBeenCalledTimes(1);
      expect(servicesService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(servicesService, 'findOne').mockRejectedValueOnce(new Error());
      expect(servicesController.findOne(id)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateServiceDto = {
      name: 'name-1',
      description: 'description-1',
      recommendedPrice: 1.1,
      providerId: 1,
    };

    it('should create a new service entity successfuly', async () => {
      const result = await servicesController.create(body);

      expect(result).toEqual(createdResponse);
      expect(servicesService.create).toHaveBeenCalledTimes(1);
      expect(servicesService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(servicesService, 'create').mockRejectedValueOnce(new Error());
      expect(servicesController.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateServiceDto = {
      name: 'service-1',
    };

    it('should update a service entity successfuly', async () => {
      const result = await servicesController.update(id, body);

      expect(result).toBeUndefined();
      expect(servicesService.update).toHaveBeenCalledTimes(1);
      expect(servicesService.update).toHaveBeenCalledWith(id, body);
    });

    it('should throw an exception', () => {
      jest.spyOn(servicesService, 'update').mockRejectedValueOnce(new Error());
      expect(servicesController.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should remove a service entity successfuly', async () => {
      const result = await servicesController.remove(id);

      expect(result).toBeUndefined();
      expect(servicesService.remove).toHaveBeenCalledTimes(1);
      expect(servicesService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(servicesService, 'remove').mockRejectedValueOnce(new Error());
      expect(servicesController.remove(id)).rejects.toThrowError();
    });
  });
});
