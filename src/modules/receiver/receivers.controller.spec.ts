import { Test, TestingModule } from '@nestjs/testing';
import { ReceiversController } from './receivers.controller';
import { ReceiversService } from './receivers.service';
import { Receiver } from './entities/receiver.entity';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';

const findResponse = [
  new Receiver({
    id: 1,
    userId: 1,
    taxId: 'teste-1',
  }),
  new Receiver({
    id: 2,
    userId: 2,
    taxId: 'teste-2',
  }),
  new Receiver({
    id: 3,
    userId: 3,
    taxId: 'teste-3',
  }),
];
const findOneResponse = new Receiver({
  id: 1,
  userId: 1,
  taxId: 'teste-1',
});
const createdResponse = { id: 1 };
const updateResponse = undefined;
const deleteResponse = undefined;

describe('ReceiversController', () => {
  let receiversController: ReceiversController;
  let receiversService: ReceiversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceiversController],
      providers: [
        {
          provide: ReceiversService,
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

    receiversController = module.get<ReceiversController>(ReceiversController);
    receiversService = module.get<ReceiversService>(ReceiversService);
  });

  it('should be defined', () => {
    expect(receiversController).toBeDefined();
    expect(receiversService).toBeDefined();
  });

  describe('find', () => {
    it('should return a receiver list entity successfully', async () => {
      const result = await receiversController.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(receiversService.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(receiversService, 'find').mockRejectedValueOnce(new Error());
      expect(receiversController.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a receiver entity successfully', async () => {
      const id = 1;
      const result = await receiversController.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(receiversService.findOne).toHaveBeenCalledTimes(1);
      expect(receiversService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(receiversService, 'findOne')
        .mockRejectedValueOnce(new Error());
      expect(receiversController.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateReceiverDto = {
      userId: 1,
      taxId: 'test-1',
    };

    it('should create a new receiver entity successfuly', async () => {
      const result = await receiversController.create(body);

      expect(result).toEqual(createdResponse);
      expect(receiversService.create).toHaveBeenCalledTimes(1);
      expect(receiversService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(receiversService, 'create').mockRejectedValueOnce(new Error());
      expect(receiversController.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateReceiverDto = {
      taxId: 'test-1',
    };

    it('should update a receiver entity successfuly', async () => {
      const result = await receiversController.update(id, body);

      expect(result).toBeUndefined();
      expect(receiversService.update).toHaveBeenCalledTimes(1);
      expect(receiversService.update).toHaveBeenCalledWith(id, body);
    });

    it('should throw an exception', () => {
      jest.spyOn(receiversService, 'update').mockRejectedValueOnce(new Error());
      expect(receiversController.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should remove a receiver entity successfuly', async () => {
      const result = await receiversController.remove(id);

      expect(result).toBeUndefined();
      expect(receiversService.remove).toHaveBeenCalledTimes(1);
      expect(receiversService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(receiversService, 'remove').mockRejectedValueOnce(new Error());
      expect(receiversController.remove(id)).rejects.toThrowError();
    });
  });
});
