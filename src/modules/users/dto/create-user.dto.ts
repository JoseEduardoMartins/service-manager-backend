import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Unique } from '../../../common/decorators/is-unique.decorator';
import { encrypt } from '../../../common/helpers/crypto';
import { formatDate } from '../../../common/helpers/date';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 300)
  name: string;

  @ApiProperty({ required: true })
  @IsISO8601()
  @Transform(({ value }) => formatDate(value))
  birthdate: string;

  @ApiProperty({ required: true })
  @IsString()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Length(0, 50)
  @Unique(User, 'phone')
  phone: string;

  @ApiProperty({ required: true })
  @IsString()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Length(0, 50)
  @Unique(User, 'taxId')
  taxId: string;

  @ApiProperty({ required: true })
  @IsEmail()
  @Length(0, 300)
  @Unique(User, 'email')
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @Transform(({ value }) => encrypt(value))
  @Length(8, 300)
  password: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  address_id?: number;
}

export class CreateUserServiceDto extends CreateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(6, 6)
  securityCode?: string;
}
