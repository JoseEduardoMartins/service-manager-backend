import { PartialType } from '@nestjs/swagger';
import { CreateStateDto } from './create-states.dto';

export class UpdateStateDto extends PartialType(CreateStateDto) {}
