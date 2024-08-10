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

class FiltersProviderDto {
  @ApiProperty({ required: true })
  @IsNumber()
  userId: number;

  @ApiProperty({ required: false })
  @IsString()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Length(0, 14)
  @IsOptional()
  taxId?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  sectorId?: number;
}

export class ParamsProviderDto extends GenericParamsDto<FiltersProviderDto> {}

export class FindProviderDto extends FiltersProviderDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
