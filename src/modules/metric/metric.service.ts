import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metric } from './entities/metric.entity';
import {
  CreateMetricDto,
  GetChartQuery,
  GetMetricQuery,
} from './dto/metric.dto';
import {
  DISTANCE_UNIT,
  DistanceUnit,
  MetricType,
  TEMP_UNIT,
  TemperatureUnit,
} from './types/metric.type';
import { IPaginationModels } from 'src/utils/response/pagination.response';
import { convertMetricUnit } from 'src/utils/helper/convert.helper';
import { startOfDay, format } from 'date-fns';

@Injectable()
export class MetricService {
  constructor(
    @InjectRepository(Metric)
    private repository: Repository<Metric>,
  ) {}

  public async createMetric(body: CreateMetricDto): Promise<Metric> {
    const { type, unit, userId, value, timestamp } = body;

    this.checkUnitMetric(type, unit);

    const metric = new Metric();
    metric.userId = userId;
    metric.type = type;
    metric.value = value;
    metric.timestamp = timestamp;
    metric.unit = unit;
    metric.date = format(startOfDay(new Date(+timestamp * 1000)), 'dd/MM/yyyy');

    return this.repository.save(metric);
  }

  public async getMetric(
    query: GetMetricQuery,
  ): Promise<IPaginationModels<Metric>> {
    const { type, formatUnit, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    if (formatUnit) {
      this.checkUnitMetric(type, formatUnit);
    }

    const totalMetric = await this.repository.count({ where: { type } });
    const metrics = await this.repository.find({
      where: { type },
      skip,
      take: limit,
    });

    const result = this.convertUnitMetric(metrics, formatUnit);

    return { total: totalMetric, items: result };
  }

  public async getChart(query: GetChartQuery): Promise<Metric[]> {
    const { type, formatUnit, from, to } = query;

    const metrics = await this.repository.query(
      `
      WITH table_2 AS (SELECT MAX(pi."timestamp") AS "timestamp"
                 FROM metrics pi
                 GROUP BY pi."date")
      SELECT *
      FROM metrics p1
      WHERE p1.timestamp in (select  * from table_2)
        and p1.type = $1
        and p1."timestamp" >= $2
        and p1."timestamp" <= $3
      ORDER BY p1."timestamp"`,
      [type, +from, +to],
    );

    const result = this.convertUnitMetric(metrics, formatUnit);

    return result;
  }

  private checkUnitMetric(
    type: MetricType,
    unit: TemperatureUnit | DistanceUnit,
  ) {
    const { DISTANCE, TEMPERATURE } = MetricType;

    const isDistanceUnit =
      type === DISTANCE && !DISTANCE_UNIT.includes(unit as any);
    const isTemperatureUnit =
      type === TEMPERATURE && !TEMP_UNIT.includes(unit as any);

    if (isDistanceUnit || isTemperatureUnit) {
      throw new BadRequestException('Wrong unit');
    }
  }

  private convertUnitMetric(
    metrics: Metric[],
    formatUnit?: TemperatureUnit | DistanceUnit,
  ) {
    return metrics.map((e) => ({
      ...e,
      unit: formatUnit || e.unit,
      value: formatUnit
        ? convertMetricUnit(e.type, e.unit, formatUnit, e.value)
        : e.value,
    }));
  }
}
