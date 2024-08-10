import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { Provider } from './entities/provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provider])],
  providers: [ProvidersService],
  controllers: [ProvidersController],
  exports: [TypeOrmModule],
})
export class ProvidersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(ProvidersController);
  }
}
