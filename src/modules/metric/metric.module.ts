import { Module } from '@nestjs/common';
import { MetricController } from './metric.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metric } from './entities/metric.entity';
import { MetricService } from './metric.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Metric]), HttpModule],
  controllers: [MetricController],
  providers: [MetricService],
  exports: [MetricService],
})
export class MetricModule {}
