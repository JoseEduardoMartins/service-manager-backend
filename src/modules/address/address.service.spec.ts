import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import {
  UpdateResponse,
  DeleteResponse,
} from '../../common/interfaces/repository-response';

const findResponse = [
  new Address({
    id: 1,
    street: 'teste-1',
    complement: 'T1',
    number: 1,
    zipcode: '9999999',
    country_id: 1,
    state_id: 1,
    city_id: 1,
  }),
  new Address({
    id: 2,
    street: 'teste-2',
    complement: 'T2',
    number: 1,
    zipcode: '9999999',
    country_id: 1,
    state_id: 1,
    city_id: 1,
  }),
  new Address({
    id: 3,
    street: 'teste-3',
    complement: 'T3',
    number: 1,
    zipcode: '9999999',
    country_id: 1,
    state_id: 1,
    city_id: 1,
  }),
];

const findOneResponse = new Address({
  id: 1,
  street: 'teste-1',
  complement: 'TT',
  number: 1,
  zipcode: '9999999',
  country_id: 1,
  state_id: 1,
  city_id: 1,
});

const createResponse = new Address({
  id: 1,
  street: 'teste-1',
  complement: 'TT',
  number: 1,
  zipcode: '9999999',
  country_id: 1,
  state_id: 1,
  city_id: 1,
});

const createdResponse = { id: 1 };

const saveResponse = new Address({
  id: 1,
  street: 'teste-1',
  complement: 'TT',
  number: 1,
  zipcode: '9999999',
  country_id: 1,
  state_id: 1,
  city_id: 1,
});

const updateResponse = new UpdateResponse({
  generatedMaps: [],
  raw: [],
  affected: 1,
});

const deleteResponse = new DeleteResponse({ raw: [], affected: 1 });

describe('AddressService', () => {
  let addressService: AddressService;
  let addressRepository: Repository<Address>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(Address),
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

    addressService = module.get<AddressService>(AddressService);
    addressRepository = module.get<Repository<Address>>(
      getRepositoryToken(Address),
    );
  });

  it('should be defined', () => {
    expect(addressService).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  describe('find', () => {
    it('should return a list of sector entities successfully', async () => {
      const result = await addressService.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(addressRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(addressRepository, 'find').mockRejectedValueOnce(new Error());
      expect(addressService.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a sector entity successfully', async () => {
      const id = 1;
      const result = await addressService.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(addressRepository.findOne).toHaveBeenCalledTimes(1);
      expect(addressRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should throw an exception', () => {
      jest.spyOn(addressService, 'findOne').mockRejectedValueOnce(new Error());
      expect(addressService.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateAddressDto = {
      street: 'teste-1',
      zipcode: '9999999',
      country_id: 1,
      state_id: 1,
      city_id: 1,
    };

    it('should create a new sector entity successfuly', async () => {
      const result = await addressService.create(body);

      expect(result).toEqual(createdResponse);
      expect(addressRepository.create).toHaveBeenCalledTimes(1);
      expect(addressRepository.save).toHaveBeenCalledTimes(1);
      expect(addressRepository.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(addressRepository, 'save').mockRejectedValueOnce(new Error());
      expect(addressService.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateAddressDto = {
      street: 'teste-1.1',
    };

    it('should update a sector entity successfuly', async () => {
      const result = await addressService.update(id, body);

      expect(result).toBeUndefined();
      expect(addressRepository.update).toHaveBeenCalledTimes(1);
      expect(addressRepository.update).toHaveBeenCalledWith({ id }, body);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(addressRepository, 'update')
        .mockRejectedValueOnce(new Error());
      expect(addressService.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a sector entity successfuly', async () => {
      const id = 1;

      const result = await addressService.remove(id);

      expect(result).toBeUndefined();
      expect(addressRepository.delete).toHaveBeenCalledTimes(1);
      expect(addressRepository.delete).toHaveBeenCalledWith({ id });
    });

    it('should throw an exception', () => {
      const id = 1;

      jest
        .spyOn(addressRepository, 'delete')
        .mockRejectedValueOnce(new Error());
      expect(addressService.remove(id)).rejects.toThrowError();
    });
  });
});
