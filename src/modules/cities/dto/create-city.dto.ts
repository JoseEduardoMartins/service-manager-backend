import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';
import { Exist } from '../../../common/decorators/is-exist';
import { State } from '../../../modules/states/entities/state.entity';

export class CreateCityDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 300)
  name: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @Exist(State, 'id')
  stateId: number;
}
