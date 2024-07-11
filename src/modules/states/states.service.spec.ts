import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateService } from './states.service';
import { State } from './entities/state.entity';
import { CreateStateDto } from './dto/create-states.dto';
import { UpdateStateDto } from './dto/update-states.dto';
import {
  UpdateResponse,
  DeleteResponse,
} from '../../common/interfaces/repository-response';

const findResponse = [
  new State({ id: 1, name: 'test-1', countryId: 1 }),
  new State({ id: 2, name: 'test-2', countryId: 1 }),
  new State({ id: 3, name: 'test-3', countryId: 1 }),
];
const findOneResponse = new State({ id: 1, name: 'test-1', countryId: 1 });
const createResponse = new State({ id: 1, name: 'test-1', countryId: 1 });
const saveResponse = new State({ id: 1, name: 'test-1', countryId: 1 });
const createdResponse = { id: 1 };
const updateResponse = new UpdateResponse({
  generatedMaps: [],
  raw: [],
  affected: 1,
});
const deleteResponse = new DeleteResponse({ raw: [], affected: 1 });

describe('StateService', () => {
  let statesService: StateService;
  let statesRepository: Repository<State>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(State),
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

    statesService = module.get<StateService>(StateService);
    statesRepository = module.get<Repository<State>>(getRepositoryToken(State));
  });

  it('should be defined', () => {
    expect(statesService).toBeDefined();
    expect(statesRepository).toBeDefined();
  });

  describe('find', () => {
    it('should return a state entity list successfully', async () => {
      const result = await statesService.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(statesRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(statesRepository, 'find').mockRejectedValueOnce(new Error());
      expect(statesService.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a state entity successfully', async () => {
      const id = 1;
      const result = await statesService.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(statesRepository.findOne).toHaveBeenCalledTimes(1);
      expect(statesRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw an exception', () => {
      jest.spyOn(statesService, 'findOne').mockRejectedValueOnce(new Error());
      expect(statesService.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateStateDto = {
      name: 'teste-1',
      countryId: 1,
    };

    it('should create a new state entity successfuly', async () => {
      const result = await statesService.create(body);

      expect(result).toEqual(createdResponse);
      expect(statesRepository.create).toHaveBeenCalledTimes(1);
      expect(statesRepository.save).toHaveBeenCalledTimes(1);
      expect(statesRepository.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(statesRepository, 'save').mockRejectedValueOnce(new Error());
      expect(statesService.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateStateDto = {
      name: 'teste-1.1',
    };

    it('should update a state entity successfuly', async () => {
      const result = await statesService.update(id, body);

      expect(result).toBeUndefined();
      expect(statesRepository.update).toHaveBeenCalledTimes(1);
      expect(statesRepository.update).toHaveBeenCalledWith({ id }, body);
    });

    it('should throw an exception', () => {
      jest.spyOn(statesRepository, 'update').mockRejectedValueOnce(new Error());
      expect(statesService.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a state entity successfuly', async () => {
      const id = 1;

      const result = await statesService.remove(id);

      expect(result).toBeUndefined();
      expect(statesRepository.delete).toHaveBeenCalledTimes(1);
      expect(statesRepository.delete).toHaveBeenCalledWith({ id });
    });

    it('should throw an exception', () => {
      const id = 1;

      jest.spyOn(statesRepository, 'delete').mockRejectedValueOnce(new Error());
      expect(statesService.remove(id)).rejects.toThrowError();
    });
  });
});
