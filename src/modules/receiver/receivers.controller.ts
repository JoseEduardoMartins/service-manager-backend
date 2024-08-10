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
import { ReceiversService } from './receivers.service';
import { FindReceiverDto } from './dto/find-receiver.dto';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';

@ApiTags('Receiver')
@Controller('receivers')
export class ReceiversController {
  constructor(private readonly receiversService: ReceiversService) {}

  @ApiOperation({
    description: 'Listagem de clientes utilizando filtros.',
    tags: ['Receiver'],
  })
  @Get()
  find(@Query() query?: FindReceiverDto) {
    const params = getParams(query);
    return this.receiversService.find(params);
  }

  @ApiOperation({
    description: 'Listagem de cliente utilizando id.',
    tags: ['Receiver'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.receiversService.findOne(id);
  }

  @ApiOperation({
    description: 'Criação de cliente.',
    tags: ['Receiver'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createReceiverDto: CreateReceiverDto) {
    return this.receiversService.create(createReceiverDto);
  }

  @ApiOperation({
    description: 'Atualização de cliente.',
    tags: ['Receiver'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReceiverDto: UpdateReceiverDto,
  ) {
    const response = await this.receiversService.update(id, updateReceiverDto);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @ApiOperation({
    description: 'Deleção de cliente.',
    tags: ['Receiver'],
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = await this.receiversService.remove(id);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
