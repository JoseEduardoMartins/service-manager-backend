import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

const fields = [
  'id',
  'name',
  'description',
  'recommendedPrice',
  'isActived',
  'isDeleted',
  'createdAt',
  'deletedAt',
  'providerId',
];

export class FieldsServiceDto {
  @ApiProperty({ required: false })
  @IsArray({
    groups: fields,
  })
  @IsOptional()
  fields?: Array<string>;
}

export class FiltersServiceDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 500)
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  recommendedPrice?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  providerId?: number;
}

export class OrderByServiceDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsIn(fields)
  orderField?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  orderBy?: 'ASC' | 'DESC';
}
