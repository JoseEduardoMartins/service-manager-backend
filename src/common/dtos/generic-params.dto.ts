import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';

export class GenericParamsDto<T> {
  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  select?: object;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  where?: T;
}
