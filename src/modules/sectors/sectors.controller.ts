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
import { SectorsService } from './sectors.service';
import { FindSectorDto } from './dto/find-sector.dto';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';

@ApiTags('Sector')
@Controller('sectors')
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @ApiOperation({
    description: 'Listagem de setors utilizando filtros.',
    tags: ['Sector'],
  })
  @Get()
  find(@Query() query?: FindSectorDto) {
    const params = getParams(query);
    return this.sectorsService.find(params);
  }

  @ApiOperation({
    description: 'Listagem de setor utilizando id.',
    tags: ['Sector'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sectorsService.findOne(id);
  }

  @ApiOperation({
    description: 'Criação de setor.',
    tags: ['Sector'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSectorDto: CreateSectorDto) {
    return this.sectorsService.create(createSectorDto);
  }

  @ApiOperation({
    description: 'Atualização de setor.',
    tags: ['Sector'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSectorDto: UpdateSectorDto,
  ) {
    const response = await this.sectorsService.update(id, updateSectorDto);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @ApiOperation({
    description: 'Deleção de setor.',
    tags: ['Sector'],
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = await this.sectorsService.remove(id);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
