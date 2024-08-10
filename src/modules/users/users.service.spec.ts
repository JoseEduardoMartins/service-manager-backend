import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

const createResponse = new User({
  id: 1,
  name: 'test-1',
  phone: '48 9 9999 9999',
  email: 'teste1@email.com',
  password: 'teste1',
});

const saveResponse = new User({
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

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(findResponse),
            findOne: jest.fn().mockResolvedValue(findOneResponse),
            create: jest.fn().mockResolvedValue(createResponse),
            save: jest.fn().mockResolvedValue(saveResponse),
            update: jest.fn().mockResolvedValue(updateResponse),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('find', () => {
    it('should return a user entity list successfully', async () => {
      const result = await usersService.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(usersRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(usersRepository, 'find').mockRejectedValueOnce(new Error());
      expect(usersService.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a user entity successfully', async () => {
      const id = 1;
      const result = await usersService.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw an exception', () => {
      jest.spyOn(usersService, 'findOne').mockRejectedValueOnce(new Error());
      expect(usersService.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateUserDto = {
      name: 'test-1',
      birthdate: '2000-03-30T00:00:00.000Z',
      phone: '48 9 9999 9999',
      photo: 'https://chatgpt.com/',
      taxId: '999.999.999-99',
      email: 'teste1@email.com',
      password: 'teste1',
    };

    it('should create a new user entity successfuly', async () => {
      const result = await usersService.create(body);

      expect(result).toEqual(createdResponse);
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(usersRepository, 'save').mockRejectedValueOnce(new Error());
      expect(usersService.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateUserDto = {
      name: 'test-1',
      birthdate: '2000-03-30T00:00:00.000Z',
      phone: '48 9 9999 9999',
      taxId: '999.999.999-99',
      email: 'teste1@email.com',
      password: 'teste1',
    };

    it('should update a user entity successfuly', async () => {
      const result = await usersService.update(id, body);

      expect(result).toBeUndefined();
      expect(usersRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(usersRepository, 'update').mockRejectedValueOnce(new Error());
      expect(usersService.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a user entity successfuly', async () => {
      const id = 1;

      const result = await usersService.remove(id);

      expect(result).toBeUndefined();
      expect(usersRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      const id = 1;

      jest.spyOn(usersRepository, 'update').mockRejectedValueOnce(new Error());
      expect(usersService.remove(id)).rejects.toThrowError();
    });
  });
});
