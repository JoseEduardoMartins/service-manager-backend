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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { getParams } from '../../common/helpers/params';
import { CitiesService } from './cities.service';
import { FindCityDto } from './dto/find-city.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@ApiTags('City')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiOperation({
    description: 'Listagem de cidades utilizando filtros.',
    tags: ['City'],
  })
  @Get()
  find(@Query() query?: FindCityDto) {
    const params = getParams(query);
    return this.citiesService.find(params);
  }

  @ApiOperation({
    description: 'Listagem de cidade utilizando id.',
    tags: ['City'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.citiesService.findOne(id);
  }

  @ApiOperation({
    description: 'Criação de cidade.',
    tags: ['City'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @ApiOperation({
    description: 'Atualização de cidade.',
    tags: ['City'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCityDto: UpdateCityDto,
  ) {
    const response = await this.citiesService.update(id, updateCityDto);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @ApiOperation({
    description: 'Deleção de cidade.',
    tags: ['City'],
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = await this.citiesService.remove(id);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
