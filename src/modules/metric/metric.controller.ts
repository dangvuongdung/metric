import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { MetricService } from './metric.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateMetricDto,
  CreateMetricResponseDto,
  GetChartQuery,
  GetMetricQuery,
} from './dto/metric.dto';
import { ResponseSuccess } from 'src/utils/response/success.response';
import { PaginationModel } from 'src/utils/response/pagination.response';

@ApiTags('Metric')
@Controller({
  path: 'metrics',
  version: '1',
})
export class MetricController {
  constructor(private readonly service: MetricService) {}

  @Post('')
  @ApiOkResponse({
    status: 200,
    type: CreateMetricResponseDto,
  })
  async createMetric(@Body() body: CreateMetricDto) {
    const metric = await this.service.createMetric(body);
    return ResponseSuccess(metric, HttpStatus.OK);
  }

  @Get('')
  @ApiOkResponse({
    status: 200,
    type: PaginationModel<CreateMetricResponseDto>,
  })
  async getMetric(@Query() query: GetMetricQuery) {
    const metric = await this.service.getMetric(query);
    return ResponseSuccess(metric, HttpStatus.OK);
  }

  @Get('/chart')
  @ApiOkResponse({
    status: 200,
  })
  async getDataChart(@Query() query: GetChartQuery) {
    const metric = await this.service.getChart(query);
    return ResponseSuccess(metric, HttpStatus.OK);
  }
}
