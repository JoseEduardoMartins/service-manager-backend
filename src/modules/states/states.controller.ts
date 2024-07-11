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
import { StateService } from './states.service';
import { FindStateDto } from './dto/find-states.dto';
import { CreateStateDto } from './dto/create-states.dto';
import { UpdateStateDto } from './dto/update-states.dto';

@ApiTags('State')
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @ApiOperation({
    description: 'Listagem de estados utilizando filtros.',
    tags: ['State'],
  })
  @Get()
  find(@Query() query?: FindStateDto) {
    const params = getParams(query);
    return this.stateService.find(params);
  }

  @ApiOperation({
    description: 'Listagem de estado utilizando id.',
    tags: ['State'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stateService.findOne(id);
  }

  @ApiOperation({
    description: 'Criação de estado.',
    tags: ['State'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.create(createStateDto);
  }

  @ApiOperation({
    description: 'Atualização de estado.',
    tags: ['State'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStateDto: UpdateStateDto,
  ) {
    const response = await this.stateService.update(id, updateStateDto);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @ApiOperation({
    description: 'Deleção de estado.',
    tags: ['State'],
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = await this.stateService.remove(id);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
