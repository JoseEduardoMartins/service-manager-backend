import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

const findResponse = [
  new City({
    id: 1,
    name: 'teste-1',
    stateId: 1,
  }),
  new City({
    id: 2,
    name: 'teste-2',
    stateId: 2,
  }),
  new City({
    id: 3,
    name: 'teste-3',
    stateId: 3,
  }),
];
const findOneResponse = new City({
  id: 1,
  name: 'teste-1',
  stateId: 1,
});
const createdResponse = { id: 1 };
const updateResponse = undefined;
const deleteResponse = undefined;

describe('CitiesController', () => {
  let citiesController: CitiesController;
  let citiesService: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        {
          provide: CitiesService,
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

    citiesController = module.get<CitiesController>(CitiesController);
    citiesService = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(citiesController).toBeDefined();
    expect(citiesService).toBeDefined();
  });

  describe('find', () => {
    it('should return a city list entity successfully', async () => {
      const result = await citiesController.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(citiesService.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(citiesService, 'find').mockRejectedValueOnce(new Error());
      expect(citiesController.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a city entity successfully', async () => {
      const id = 1;
      const result = await citiesController.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(citiesService.findOne).toHaveBeenCalledTimes(1);
      expect(citiesService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(citiesService, 'findOne').mockRejectedValueOnce(new Error());
      expect(citiesController.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateCityDto = {
      name: 'test-1',
      stateId: 1,
    };

    it('should create a new address entity successfuly', async () => {
      const result = await citiesController.create(body);

      expect(result).toEqual(createdResponse);
      expect(citiesService.create).toHaveBeenCalledTimes(1);
      expect(citiesService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(citiesService, 'create').mockRejectedValueOnce(new Error());
      expect(citiesController.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateCityDto = {
      name: 'test-1',
      stateId: 1,
    };

    it('should update a address entity successfuly', async () => {
      const result = await citiesController.update(id, body);

      expect(result).toBeUndefined();
      expect(citiesService.update).toHaveBeenCalledTimes(1);
      expect(citiesService.update).toHaveBeenCalledWith(id, body);
    });

    it('should throw an exception', () => {
      jest.spyOn(citiesService, 'update').mockRejectedValueOnce(new Error());
      expect(citiesController.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should remove a address entity successfuly', async () => {
      const result = await citiesController.remove(id);

      expect(result).toBeUndefined();
      expect(citiesService.remove).toHaveBeenCalledTimes(1);
      expect(citiesService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(citiesService, 'remove').mockRejectedValueOnce(new Error());
      expect(citiesController.remove(id)).rejects.toThrowError();
    });
  });
});
