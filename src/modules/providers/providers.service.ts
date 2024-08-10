import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './entities/provider.entity';
import { ParamsProviderDto } from './dto/find-provider.dto';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  find(paramsProviderDto?: ParamsProviderDto): Promise<Provider[]> {
    return this.providerRepository.find(paramsProviderDto);
  }

  findOne(id: number): Promise<Provider> {
    return this.providerRepository.findOne({ where: { id } });
  }

  async create(createProviderDto: CreateProviderDto) {
    const state = this.providerRepository.create(createProviderDto);
    const response = await this.providerRepository.save(state);
    return { id: response.id };
  }

  async update(
    id: number,
    updateProviderDto: UpdateProviderDto,
  ): Promise<void> {
    const response = await this.providerRepository.update(
      { id },
      updateProviderDto,
    );
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const response = await this.providerRepository.delete({ id });
    if (response?.affected === 0) return null;
  }
}
