import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, Length, IsOptional } from 'class-validator';
import { GenericParamsDto } from '../../../common/dtos/generic-params.dto';

class FiltersCountryDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 4)
  @IsOptional()
  isocode?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 50)
  @IsOptional()
  phonecode?: string;
}

export class ParamsCountryDto extends GenericParamsDto<FiltersCountryDto> {}

export class FindCountryDto extends FiltersCountryDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
