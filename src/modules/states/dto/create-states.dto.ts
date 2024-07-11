import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, Length } from 'class-validator';
import { Exist } from '../../../common/decorators/is-exist.decorator';
import { Country } from '../../../modules/countries/entities/country.entity';

export class CreateStateDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 300)
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 4)
  @IsOptional()
  shortName?: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @Exist(Country, 'id')
  countryId: number;
}
