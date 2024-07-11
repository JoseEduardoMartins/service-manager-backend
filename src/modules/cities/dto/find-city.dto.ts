import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { GenericParamsDto } from '../../../common/dtos/generic-params.dto';

class FiltersCityDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  stateId?: number;
}

export class ParamsCityDto extends GenericParamsDto<FiltersCityDto> {}

export class FindCityDto extends FiltersCityDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
