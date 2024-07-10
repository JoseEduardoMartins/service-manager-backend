import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateResponse } from '../../common/interfaces/repository-response';

const findResponse = [
  new User({
    id: 1,
    name: 'test-1',
    phone: '48 9 9999 9999',
    email: 'teste1@email.com',
    password: 'teste1',
  }),
  new User({
    id: 2,
    name: 'test-2',
    phone: '48 9 9999 9999',
    email: 'teste2@email.com',
    password: 'teste2',
  }),
  new User({
    id: 3,
    name: 'test-3',
    phone: '48 9 9999 9999',
    email: 'teste3@email.com',
    password: 'teste3',
  }),
];

const findOneResponse = new User({
  id: 1,
  name: 'test-1',
  phone: '48 9 9999 9999',
  email: 'teste1@email.com',
  password: 'teste1',
});

const createdResponse = { id: 1 };

const updateResponse = new UpdateResponse({
  generatedMaps: [],
  raw: [],
  affected: 1,
});

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            find: jest.fn().mockResolvedValue(findResponse),
            findOne: jest.fn().mockResolvedValue(findOneResponse),
            create: jest.fn().mockResolvedValue(createdResponse),
            update: jest.fn().mockResolvedValue(updateResponse),
            remove: jest.fn().mockResolvedValue(updateResponse),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('find', () => {
    it('should return a user list entity successfully', async () => {
      const result = await usersController.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(usersService.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(usersService, 'find').mockRejectedValueOnce(new Error());
      expect(usersController.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a user entity successfully', async () => {
      const id = 1;
      const result = await usersController.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(usersService.findOne).toHaveBeenCalledTimes(1);
      expect(usersService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(usersService, 'findOne').mockRejectedValueOnce(new Error());
      expect(usersController.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateUserDto = {
      name: 'test-1',
      birthdate: '2000-03-30T00:00:00.000Z',
      phone: '48 9 9999 9999',
      taxId: '999.999.999-99',
      email: 'teste1@email.com',
      password: 'teste1',
    };

    it('should create a new user entity successfuly', async () => {
      const result = await usersController.create(body);

      expect(result).toEqual(createdResponse);
      expect(usersService.create).toHaveBeenCalledTimes(1);
      expect(usersService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(usersService, 'create').mockRejectedValueOnce(new Error());
      expect(usersController.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateUserDto = {
      name: 'test-1',
      phone: '48 9 9999 9999',
      email: 'teste1@email.com',
      password: 'teste1',
    };

    it('should update a user entity successfuly', async () => {
      const result = await usersController.update(id, body);

      expect(result).toBeUndefined();
      expect(usersService.update).toHaveBeenCalledTimes(1);
      expect(usersService.update).toHaveBeenCalledWith(id, body);
    });

    it('should throw an exception', () => {
      jest.spyOn(usersService, 'update').mockRejectedValueOnce(new Error());
      expect(usersController.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should remove a user entity successfuly', async () => {
      const result = await usersController.remove(id);

      expect(result).toBeUndefined();
      expect(usersService.remove).toHaveBeenCalledTimes(1);
      expect(usersService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(usersService, 'remove').mockRejectedValueOnce(new Error());
      expect(usersController.remove(id)).rejects.toThrowError();
    });
  });
});
