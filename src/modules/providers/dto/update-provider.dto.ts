import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';
import { Unique } from '../../../common/decorators/is-unique';
import { Provider } from '../entities/provider.entity';

export class UpdateProviderDto {
  @ApiProperty({ required: false })
  @IsString()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Length(0, 11)
  @Unique(Provider, 'taxId')
  @IsOptional()
  taxId?: string;
}
