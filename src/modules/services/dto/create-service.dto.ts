import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Exist } from 'src/common/decorators/is-exist';
import { Provider } from 'src/modules/providers/entities/provider.entity';

export class CreateServiceDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 300)
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 500)
  @IsOptional()
  description?: string;

  @ApiProperty({ required: true })
  @IsNumber()
  recommendedPrice: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @Exist(Provider, 'id')
  providerId: number;
}
