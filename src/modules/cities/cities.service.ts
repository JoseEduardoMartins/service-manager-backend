import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { ParamsCityDto } from './dto/find-city.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  find(paramsStateDto?: ParamsCityDto): Promise<City[]> {
    return this.cityRepository.find(paramsStateDto);
  }

  findOne(id: number): Promise<City> {
    return this.cityRepository.findOne({ where: { id } });
  }

  async create(createCityDto: CreateCityDto) {
    const state = this.cityRepository.create(createCityDto);
    const response = await this.cityRepository.save(state);
    return { id: response.id };
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<void> {
    const response = await this.cityRepository.update({ id }, updateCityDto);
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const response = await this.cityRepository.delete({ id });
    if (response?.affected === 0) return null;
  }
}
