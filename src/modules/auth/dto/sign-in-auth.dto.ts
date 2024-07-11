import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsEmail, Length } from 'class-validator';
import { encrypt } from '../../../common/helpers/crypto';

export class SignInAuthDto {
  @ApiProperty({ required: true })
  @IsEmail()
  @Length(0, 150)
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @Transform(({ value }) => encrypt(value))
  @Length(8, 300)
  password: string;
}
