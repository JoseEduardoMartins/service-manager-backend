import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receiver } from './entities/receiver.entity';
import { ParamsReceiverDto } from './dto/find-receiver.dto';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';

@Injectable()
export class ReceiversService {
  constructor(
    @InjectRepository(Receiver)
    private receiverRepository: Repository<Receiver>,
  ) {}

  find(paramsReceiverDto?: ParamsReceiverDto): Promise<Receiver[]> {
    return this.receiverRepository.find(paramsReceiverDto);
  }

  findOne(id: number): Promise<Receiver> {
    return this.receiverRepository.findOne({ where: { id } });
  }

  async create(createReceiverDto: CreateReceiverDto) {
    const state = this.receiverRepository.create(createReceiverDto);
    const response = await this.receiverRepository.save(state);
    return { id: response.id };
  }

  async update(
    id: number,
    updateReceiverDto: UpdateReceiverDto,
  ): Promise<void> {
    const response = await this.receiverRepository.update(
      { id },
      updateReceiverDto,
    );
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const response = await this.receiverRepository.delete({ id });
    if (response?.affected === 0) return null;
  }
}
