import { Test, TestingModule } from '@nestjs/testing';
import {
  DeleteResponse,
  UpdateResponse,
} from '../../common/interfaces/repository-response';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { Sector } from './entities/sector.entity';
import { SectorsController } from './sectors.controller';
import { SectorsService } from './sectors.service';

const findResponse = [
  new Sector({
    id: 1,
    label: 'label-1',
  }),
  new Sector({
    id: 2,
    label: 'label-2',
  }),
  new Sector({
    id: 3,
    label: 'label-3',
  }),
];

const findOneResponse = new Sector({
  id: 1,
  label: 'label-1',
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

describe('SectorsController', () => {
  let sectorsController: SectorsController;
  let sectorsService: SectorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectorsController],
      providers: [
        {
          provide: SectorsService,
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

    sectorsController = module.get<SectorsController>(SectorsController);
    sectorsService = module.get<SectorsService>(SectorsService);
  });

  it('should be defined', () => {
    expect(sectorsController).toBeDefined();
    expect(sectorsService).toBeDefined();
  });

  describe('find', () => {
    it('should return a sector list entity successfully', async () => {
      const result = await sectorsController.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(sectorsService.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(sectorsService, 'find').mockRejectedValueOnce(new Error());
      expect(sectorsController.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    const id = 1;

    it('should return a sector entity successfully', async () => {
      const result = await sectorsController.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(sectorsService.findOne).toHaveBeenCalledTimes(1);
      expect(sectorsService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(sectorsService, 'findOne').mockRejectedValueOnce(new Error());
      expect(sectorsController.findOne(id)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateSectorDto = {
      label: 'sector-11',
    };

    it('should create a new sector entity successfuly', async () => {
      const result = await sectorsController.create(body);

      expect(result).toEqual(createdResponse);
      expect(sectorsService.create).toHaveBeenCalledTimes(1);
      expect(sectorsService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(sectorsService, 'create').mockRejectedValueOnce(new Error());
      expect(sectorsController.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateSectorDto = {
      label: 'sector-1',
    };

    it('should update a sector entity successfuly', async () => {
      const result = await sectorsController.update(id, body);

      expect(result).toBeUndefined();
      expect(sectorsService.update).toHaveBeenCalledTimes(1);
      expect(sectorsService.update).toHaveBeenCalledWith(id, body);
    });

    it('should throw an exception', () => {
      jest.spyOn(sectorsService, 'update').mockRejectedValueOnce(new Error());
      expect(sectorsController.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should remove a sector entity successfuly', async () => {
      const result = await sectorsController.remove(id);

      expect(result).toBeUndefined();
      expect(sectorsService.remove).toHaveBeenCalledTimes(1);
      expect(sectorsService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(sectorsService, 'remove').mockRejectedValueOnce(new Error());
      expect(sectorsController.remove(id)).rejects.toThrowError();
    });
  });
});
