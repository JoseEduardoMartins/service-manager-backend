import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, Length } from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';
import { Exist } from '../../../common/decorators/is-exist';
import { Unique } from '../../../common/decorators/is-unique';
import { Receiver } from '../entities/receiver.entity';

export class CreateReceiverDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @Unique(Receiver, 'userId')
  @Exist(User, 'id')
  userId: number;

  @ApiProperty({ required: true })
  @IsString()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Length(0, 11)
  @Unique(Receiver, 'taxId')
  taxId: string;
}
