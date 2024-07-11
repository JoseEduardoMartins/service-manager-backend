import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

const addressEtityList: Address[] = [
  new Address({
    id: 1,
    street: 'test-1',
    complement: 'casa',
    number: 1,
    zipcode: '1111-111',
    country_id: 1,
    state_id: 1,
    city_id: 1,
  }),
  new Address({
    id: 2,
    street: 'test-2',
    complement: 'casa',
    number: 2,
    zipcode: '2222222',
    country_id: 2,
    state_id: 2,
    city_id: 2,
  }),
  new Address({
    id: 3,
    street: 'test-3',
    complement: 'casa',
    number: 3,
    zipcode: '3333333',
    country_id: 3,
    state_id: 3,
    city_id: 3,
  }),
];

const createResponse = { id: 1 };

describe('AddressController', () => {
  let addressController: AddressController;
  let addressService: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        {
          provide: AddressService,
          useValue: {
            find: jest.fn().mockResolvedValue(addressEtityList),
            findOne: jest.fn().mockResolvedValue(addressEtityList[0]),
            create: jest.fn().mockResolvedValue(createResponse),
            update: jest.fn().mockResolvedValue(undefined),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    addressController = module.get<AddressController>(AddressController);
    addressService = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(addressController).toBeDefined();
    expect(addressService).toBeDefined();
  });

  describe('find', () => {
    it('should return a address list entity successfully', async () => {
      const result = await addressController.find();

      expect(result).toEqual(addressEtityList);
      expect(typeof result).toEqual('object');
      expect(addressService.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(addressService, 'find').mockRejectedValueOnce(new Error());
      expect(addressController.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a address entity successfully', async () => {
      const id = 1;
      const result = await addressController.findOne(id);

      expect(result).toEqual(addressEtityList[0]);
      expect(typeof result).toEqual('object');
      expect(addressService.findOne).toHaveBeenCalledTimes(1);
      expect(addressService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(addressService, 'findOne').mockRejectedValueOnce(new Error());
      expect(addressController.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateAddressDto = {
      street: 'test-1',
      complement: 'casa',
      number: 1,
      zipcode: '1111-111',
      country_id: 1,
      state_id: 1,
      city_id: 1,
    };

    it('should create a new address entity successfuly', async () => {
      const result = await addressController.create(body);

      expect(result).toEqual(createResponse);
      expect(addressService.create).toHaveBeenCalledTimes(1);
      expect(addressService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(addressService, 'create').mockRejectedValueOnce(new Error());
      expect(addressController.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateAddressDto = {
      street: 'test-1',
      complement: 'casa',
      number: 1,
      zipcode: '1111-111',
      country_id: 1,
      state_id: 1,
      city_id: 1,
    };

    it('should update a address entity successfuly', async () => {
      const result = await addressController.update(id, body);

      expect(result).toBeUndefined();
      expect(addressService.update).toHaveBeenCalledTimes(1);
      expect(addressService.update).toHaveBeenCalledWith(id, body);
    });

    it('should throw an exception', () => {
      jest.spyOn(addressService, 'update').mockRejectedValueOnce(new Error());
      expect(addressController.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should remove a address entity successfuly', async () => {
      const result = await addressController.remove(id);

      expect(result).toBeUndefined();
      expect(addressService.remove).toHaveBeenCalledTimes(1);
      expect(addressService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(addressService, 'remove').mockRejectedValueOnce(new Error());
      expect(addressController.remove(id)).rejects.toThrowError();
    });
  });
});
