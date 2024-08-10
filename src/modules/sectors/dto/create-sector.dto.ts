import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Unique } from 'src/common/decorators/is-unique';
import { Sector } from '../entities/sector.entity';

export class CreateSectorDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 300)
  @Unique(Sector, 'label')
  label: string;
}
