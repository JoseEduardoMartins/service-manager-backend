import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';
import { Unique } from '../../../common/decorators/is-unique';
import { Country } from '../entities/country.entity';

export class CreateCountryDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 300)
  @Unique(Country, 'name')
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 10)
  @IsOptional()
  isocode?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 50)
  @IsOptional()
  phonecode?: string;
}
