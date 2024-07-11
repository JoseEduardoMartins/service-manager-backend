import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  providers: [CountriesService],
  controllers: [CountriesController],
  exports: [TypeOrmModule],
})
export class CountriesModule {}
