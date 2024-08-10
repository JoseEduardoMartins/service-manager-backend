import { Test, TestingModule } from '@nestjs/testing';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { Provider } from './entities/provider.entity';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

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
const createdResponse = { id: 1 };
const updateResponse = undefined;
const deleteResponse = undefined;

describe('ProvidersController', () => {
  let providersController: ProvidersController;
  let providersService: ProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvidersController],
      providers: [
        {
          provide: ProvidersService,
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

    providersController = module.get<ProvidersController>(ProvidersController);
    providersService = module.get<ProvidersService>(ProvidersService);
  });

  it('should be defined', () => {
    expect(providersController).toBeDefined();
    expect(providersService).toBeDefined();
  });

  describe('find', () => {
    it('should return a provider list entity successfully', async () => {
      const result = await providersController.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(providersService.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(providersService, 'find').mockRejectedValueOnce(new Error());
      expect(providersController.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a provider entity successfully', async () => {
      const id = 1;
      const result = await providersController.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(providersService.findOne).toHaveBeenCalledTimes(1);
      expect(providersService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(providersService, 'findOne')
        .mockRejectedValueOnce(new Error());
      expect(providersController.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateProviderDto = {
      userId: 1,
      taxId: 'test-1',
      sectorId: 1,
    };

    it('should create a new provider entity successfuly', async () => {
      const result = await providersController.create(body);

      expect(result).toEqual(createdResponse);
      expect(providersService.create).toHaveBeenCalledTimes(1);
      expect(providersService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(providersService, 'create').mockRejectedValueOnce(new Error());
      expect(providersController.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateProviderDto = {
      taxId: 'test-1',
      sectorId: 1,
    };

    it('should update a provider entity successfuly', async () => {
      const result = await providersController.update(id, body);

      expect(result).toBeUndefined();
      expect(providersService.update).toHaveBeenCalledTimes(1);
      expect(providersService.update).toHaveBeenCalledWith(id, body);
    });

    it('should throw an exception', () => {
      jest.spyOn(providersService, 'update').mockRejectedValueOnce(new Error());
      expect(providersController.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should remove a provider entity successfuly', async () => {
      const result = await providersController.remove(id);

      expect(result).toBeUndefined();
      expect(providersService.remove).toHaveBeenCalledTimes(1);
      expect(providersService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(providersService, 'remove').mockRejectedValueOnce(new Error());
      expect(providersController.remove(id)).rejects.toThrowError();
    });
  });
});
