import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { ReceiversController } from './receivers.controller';
import { ReceiversService } from './receivers.service';
import { Receiver } from './entities/receiver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receiver])],
  providers: [ReceiversService],
  controllers: [ReceiversController],
  exports: [TypeOrmModule],
})
export class ReceiversModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(ReceiversController);
  }
}
