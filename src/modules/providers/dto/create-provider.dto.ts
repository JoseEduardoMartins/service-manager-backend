import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';
import { Exist } from '../../../common/decorators/is-exist';
import { Unique } from '../../../common/decorators/is-unique';
import { Sector } from '../../sectors/entities/sector.entity';
import { Provider } from '../entities/provider.entity';

export class CreateProviderDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @Unique(Provider, 'userId')
  @Exist(User, 'id')
  userId: number;

  @ApiProperty({ required: true })
  @IsString()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Length(0, 14)
  @Unique(Provider, 'taxId')
  taxId: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 1000)
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @Length(0, 300)
  @IsOptional()
  linkedinLink?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @Length(0, 300)
  @IsOptional()
  instagramLink?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @Length(0, 300)
  @IsOptional()
  facebookLink?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @Length(0, 300)
  @IsOptional()
  homepageLink?: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @Exist(Sector, 'id')
  sectorId: number;
}
