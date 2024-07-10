import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;
}

export class UpdateUserServideDto extends UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(6, 6)
  securityCode?: string;
}
