import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './entities/state.entity';
import { ParamsStateDto } from './dto/find-states.dto';
import { CreateStateDto } from './dto/create-states.dto';
import { UpdateStateDto } from './dto/update-states.dto';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private stateRepository: Repository<State>,
  ) {}

  find(paramsStateDto?: ParamsStateDto): Promise<State[]> {
    return this.stateRepository.find(paramsStateDto);
  }

  findOne(id: number): Promise<State> {
    return this.stateRepository.findOne({ where: { id } });
  }

  async create(createStateDto: CreateStateDto) {
    const state = this.stateRepository.create(createStateDto);
    const response = await this.stateRepository.save(state);
    return { id: response.id };
  }

  async update(id: number, updateStateDto: UpdateStateDto): Promise<void> {
    const response = await this.stateRepository.update({ id }, updateStateDto);
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const response = await this.stateRepository.delete({ id });
    if (response?.affected === 0) return null;
  }
}
