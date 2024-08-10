import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from './entities/sector.entity';
import { ParamsSectorDto } from './dto/find-sector.dto';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(Sector)
    private sectorRepository: Repository<Sector>,
  ) {}

  find(paramsStateDto?: ParamsSectorDto): Promise<Sector[]> {
    return this.sectorRepository.find(paramsStateDto);
  }

  findOne(id: number): Promise<Sector> {
    return this.sectorRepository.findOne({ where: { id } });
  }

  async create(createSectorDto: CreateSectorDto) {
    const state = this.sectorRepository.create(createSectorDto);
    const response = await this.sectorRepository.save(state);
    return { id: response.id };
  }

  async update(id: number, updateSectorDto: UpdateSectorDto): Promise<void> {
    const response = await this.sectorRepository.update(
      { id },
      updateSectorDto,
    );
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const response = await this.sectorRepository.delete({ id });
    if (response?.affected === 0) return null;
  }
}
