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
import { ProvidersService } from './providers.service';
import { FindProviderDto } from './dto/find-provider.dto';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@ApiTags('Provider')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @ApiOperation({
    description: 'Listagem de provedores de serviço utilizando filtros.',
    tags: ['Provider'],
  })
  @Get()
  find(@Query() query?: FindProviderDto) {
    const params = getParams(query);
    return this.providersService.find(params);
  }

  @ApiOperation({
    description: 'Listagem de provedor de serviço utilizando id.',
    tags: ['Provider'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.providersService.findOne(id);
  }

  @ApiOperation({
    description: 'Criação de provedor de serviço.',
    tags: ['Provider'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @ApiOperation({
    description: 'Atualização de provedor de serviço.',
    tags: ['Provider'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    const response = await this.providersService.update(id, updateProviderDto);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @ApiOperation({
    description: 'Deleção de provedor de serviço.',
    tags: ['Provider'],
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = await this.providersService.remove(id);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
