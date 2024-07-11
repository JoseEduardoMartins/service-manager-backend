import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { ParamsAddressDto } from './dto/find-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  find(paramsAddressDto?: ParamsAddressDto): Promise<Address[]> {
    return this.addressRepository.find(paramsAddressDto);
  }

  findOne(id: number): Promise<Address> {
    return this.addressRepository.findOne({ where: { id } });
  }

  async create(createAddressDto: CreateAddressDto) {
    const address = this.addressRepository.create(createAddressDto);
    const response = await this.addressRepository.save(address);
    return { id: response.id };
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<void> {
    const response = await this.addressRepository.update(
      { id },
      updateAddressDto,
    );
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const response = await this.addressRepository.delete({ id });
    if (response?.affected === 0) return null;
  }
}
