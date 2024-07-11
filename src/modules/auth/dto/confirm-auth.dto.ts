import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class ConfirmAuthDto {
  @ApiProperty({ required: true })
  @IsEmail()
  @Length(0, 150)
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(6, 6)
  securityCode?: string;
}
