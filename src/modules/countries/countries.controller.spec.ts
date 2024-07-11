import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

const countryEtityList: Country[] = [
  new Country({ id: 1, name: 'test-1', isocode: 'BR', phonecode: '+55' }),
  new Country({ id: 2, name: 'test-2', isocode: 'BR', phonecode: '+55' }),
  new Country({ id: 3, name: 'test-3', isocode: 'BR', phonecode: '+55' }),
];

const createResponse = { id: 1 };

describe('CountriesController', () => {
  let countriesController: CountriesController;
  let countriesService: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        {
          provide: CountriesService,
          useValue: {
            find: jest.fn().mockResolvedValue(countryEtityList),
            findOne: jest.fn().mockResolvedValue(countryEtityList[0]),
            create: jest.fn().mockResolvedValue(createResponse),
            update: jest.fn().mockResolvedValue(undefined),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    countriesController = module.get<CountriesController>(CountriesController);
    countriesService = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(countriesController).toBeDefined();
    expect(countriesService).toBeDefined();
  });

  describe('find', () => {
    it('should return a country list entity successfully', async () => {
      const result = await countriesController.find();

      expect(result).toEqual(countryEtityList);
      expect(typeof result).toEqual('object');
      expect(countriesService.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(countriesService, 'find').mockRejectedValueOnce(new Error());
      expect(countriesController.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a sector entity successfully', async () => {
      const id = 1;
      const result = await countriesController.findOne(id);

      expect(result).toEqual(countryEtityList[0]);
      expect(typeof result).toEqual('object');
      expect(countriesService.findOne).toHaveBeenCalledTimes(1);
      expect(countriesService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(countriesService, 'findOne')
        .mockRejectedValueOnce(new Error());
      expect(countriesController.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new sector entity successfuly', async () => {
      const body: CreateCountryDto = {
        name: 'test-1',
      };

      const result = await countriesController.create(body);

      expect(result).toEqual(createResponse);
      expect(countriesService.create).toHaveBeenCalledTimes(1);
      expect(countriesService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      const body: CreateCountryDto = {
        name: 'test-1',
      };

      jest.spyOn(countriesService, 'create').mockRejectedValueOnce(new Error());
      expect(countriesController.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a sector entity successfuly', async () => {
      const id = 1;

      const body: UpdateCountryDto = {
        name: 'test-1',
      };

      const result = await countriesController.update(id, body);

      expect(result).toBeUndefined();
      expect(countriesService.update).toHaveBeenCalledTimes(1);
      expect(countriesService.update).toHaveBeenCalledWith(id, body);
    });

    it('should throw an exception', () => {
      const id = 1;

      const body: UpdateCountryDto = {
        name: 'test-1',
      };

      jest.spyOn(countriesService, 'update').mockRejectedValueOnce(new Error());
      expect(countriesController.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a sector entity successfuly', async () => {
      const id = 1;

      const result = await countriesController.remove(id);

      expect(result).toBeUndefined();
      expect(countriesService.remove).toHaveBeenCalledTimes(1);
      expect(countriesService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      const id = 1;

      jest.spyOn(countriesService, 'remove').mockRejectedValueOnce(new Error());
      expect(countriesController.remove(id)).rejects.toThrowError();
    });
  });
});
