import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiSecurity, ApiOperation } from '@nestjs/swagger';
import { getParams } from '../../common/helpers/params';
import { AddressService } from './address.service';
import { FindAddressDto } from './dto/find-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('Address')
@ApiSecurity('token')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({
    description: 'Listagem de endereços utilizando filtros.',
    tags: ['Address'],
  })
  @Get()
  find(@Query() query?: FindAddressDto) {
    const params = getParams(query);
    return this.addressService.find(params);
  }

  @ApiOperation({
    description: 'Listagem de endereço utilizando id.',
    tags: ['Address'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.findOne(id);
  }

  @ApiOperation({
    description: 'Criação de endereço.',
    tags: ['Address'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @ApiOperation({
    description: 'Atualização de endereço.',
    tags: ['Address'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    const response = await this.addressService.update(id, updateAddressDto);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @ApiOperation({
    description: 'Deleção de endereço.',
    tags: ['Address'],
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = await this.addressService.remove(id);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
