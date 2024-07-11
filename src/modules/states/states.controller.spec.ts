import { Test, TestingModule } from '@nestjs/testing';
import { StateController } from './states.controller';
import { StateService } from './states.service';
import { State } from './entities/state.entity';
import { CreateStateDto } from './dto/create-states.dto';
import { UpdateStateDto } from './dto/update-states.dto';
import {
  UpdateResponse,
  DeleteResponse,
} from '../../common/interfaces/repository-response';

const findResponse = [
  new State({
    id: 1,
    name: 'teste-1',
    shortName: 'TT',
    countryId: 1,
  }),
  new State({
    id: 2,
    name: 'teste-2',
    shortName: 'TT',
    countryId: 2,
  }),
  new State({
    id: 3,
    name: 'teste-3',
    shortName: 'TT',
    countryId: 3,
  }),
];

const findOneResponse = new State({
  id: 1,
  name: 'teste-1',
  shortName: 'TT',
  countryId: 1,
});

const createdResponse = { id: 1 };

const updateResponse = new UpdateResponse({
  generatedMaps: [],
  raw: [],
  affected: 1,
});

const deleteResponse = new DeleteResponse({ raw: [], affected: 1 });

describe('StateController', () => {
  let stateController: StateController;
  let stateService: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateController],
      providers: [
        {
          provide: StateService,
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

    stateController = module.get<StateController>(StateController);
    stateService = module.get<StateService>(StateService);
  });

  it('should be defined', () => {
    expect(stateController).toBeDefined();
    expect(stateService).toBeDefined();
  });

  describe('find', () => {
    it('should return a state list entity successfully', async () => {
      const result = await stateController.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(stateService.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(stateService, 'find').mockRejectedValueOnce(new Error());
      expect(stateController.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a state entity successfully', async () => {
      const id = 1;
      const result = await stateController.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(stateService.findOne).toHaveBeenCalledTimes(1);
      expect(stateService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(stateService, 'findOne').mockRejectedValueOnce(new Error());
      expect(stateController.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateStateDto = {
      name: 'test-1',
      shortName: 'TT',
      countryId: 1,
    };

    it('should create a new state entity successfuly', async () => {
      const result = await stateController.create(body);

      expect(result).toEqual(createdResponse);
      expect(stateService.create).toHaveBeenCalledTimes(1);
      expect(stateService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(stateService, 'create').mockRejectedValueOnce(new Error());
      expect(stateController.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateStateDto = {
      name: 'test-1',
      shortName: 'TT',
      countryId: 1,
    };

    it('should update a state entity successfuly', async () => {
      const result = await stateController.update(id, body);

      expect(result).toBeUndefined();
      expect(stateService.update).toHaveBeenCalledTimes(1);
      expect(stateService.update).toHaveBeenCalledWith(id, body);
    });

    it('should throw an exception', () => {
      jest.spyOn(stateService, 'update').mockRejectedValueOnce(new Error());
      expect(stateController.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should remove a state entity successfuly', async () => {
      const result = await stateController.remove(id);

      expect(result).toBeUndefined();
      expect(stateService.remove).toHaveBeenCalledTimes(1);
      expect(stateService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(stateService, 'remove').mockRejectedValueOnce(new Error());
      expect(stateController.remove(id)).rejects.toThrowError();
    });
  });
});
