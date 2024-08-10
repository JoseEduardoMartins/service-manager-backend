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

class FiltersReceiverDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Length(0, 14)
  @IsOptional()
  taxId?: string;
}

export class ParamsReceiverDto extends GenericParamsDto<FiltersReceiverDto> {}

export class FindReceiverDto extends FiltersReceiverDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
