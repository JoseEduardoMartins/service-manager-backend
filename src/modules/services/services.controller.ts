import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateServiceDto } from './dto/create-service.dto';
import {
  FieldsServiceDto,
  FiltersServiceDto,
  OrderByServiceDto,
} from './dto/find-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';
import { getOrderBy, getSelects } from 'src/common/helpers/params';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiOperation({
    description: 'Listagem de serviços utilizando filtros.',
    tags: ['Service'],
  })
  @Get()
  find(
    @Query() fields: FieldsServiceDto,
    @Query() filters: FiltersServiceDto,
    @Query() orderBy: OrderByServiceDto,
  ) {
    const params = {
      select: getSelects(fields.fields),
      where: filters,
      order: getOrderBy(orderBy),
    };

    return this.servicesService.find(params);
  }

  @ApiOperation({
    description: 'Listagem de serviço utilizando id.',
    tags: ['Service'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.findOne(id);
  }

  @ApiOperation({
    description: 'Criação de serviço.',
    tags: ['Service'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @ApiOperation({
    description: 'Atualização de serviço.',
    tags: ['Service'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    const response = await this.servicesService.update(id, updateServiceDto);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @ApiOperation({
    description: 'Deleção de serviço.',
    tags: ['Service'],
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = await this.servicesService.remove(id);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
