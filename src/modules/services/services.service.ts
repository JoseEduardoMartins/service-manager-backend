import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { ParamsServiceDto } from './dto/find-service.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  find(paramsServiceDto?: ParamsServiceDto): Promise<Service[]> {
    return this.serviceRepository.find(paramsServiceDto);
  }

  findOne(id: number): Promise<Service> {
    return this.serviceRepository.findOne({ where: { id } });
  }

  async create(createServiceDto: CreateServiceDto) {
    const data = {
      ...createServiceDto,
      isActived: true,
      isDeleted: false,
      createdAt: new Date(),
    };

    const state = this.serviceRepository.create(data);
    const response = await this.serviceRepository.save(state);
    return { id: response.id };
  }

  async update(id: number, updateServiceDto: UpdateServiceDto): Promise<void> {
    const response = await this.serviceRepository.update(
      { id },
      updateServiceDto,
    );
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const data = {
      isActived: false,
      isDeleted: true,
      deletedAt: new Date(),
    };

    const response = await this.serviceRepository.update({ id }, data);
    if (response?.affected === 0) return null;
  }
}
