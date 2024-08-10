import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsString, Length } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export enum UserType {
  ADMIN = 'admin',
  PROVIDER = 'provider',
  RECEIVER = 'receiver',
}

export class SignUpAuthDto extends CreateUserDto {
  @ApiProperty({ required: true })
  @IsIn([UserType.PROVIDER, UserType.RECEIVER], {
    message: 'Tipo de usuário inválido. Deve ser "provider" ou "receiver"',
  })
  userType: UserType;

  @ApiProperty({ required: true })
  @IsString()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Length(0, 14)
  taxId: string;
}
