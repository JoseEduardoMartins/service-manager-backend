import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';
import { Unique } from '../../../common/decorators/is-unique';
import { Receiver } from '../entities/receiver.entity';

export class UpdateReceiverDto {
  @ApiProperty({ required: false })
  @IsString()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Length(0, 11)
  @Unique(Receiver, 'taxId')
  @IsOptional()
  taxId?: string;
}
