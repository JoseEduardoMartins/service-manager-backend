import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { GenericParamsDto } from '../../../common/dtos/generic-params.dto';

export class FiltersUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 50)
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @Length(0, 150)
  @IsOptional()
  email?: string;
}

export class ParamsUserDto extends GenericParamsDto<FiltersUserDto> {}

export class FindUserDto extends FiltersUserDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
