import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { StateController } from './states.controller';
import { StateService } from './states.service';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StateService],
  controllers: [StateController],
  exports: [TypeOrmModule],
})
export class StatesModule {}
