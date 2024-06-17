import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  DISTANCE_UNIT,
  DistanceUnit,
  MetricType,
  TEMP_UNIT,
  TemperatureUnit,
} from '../types/metric.type';
import { Type } from 'class-transformer';

export class TypeMertric {
  @ApiProperty({
    type: String,
    example: Object.values(MetricType).join('|'),
    description: 'Type of metric',
  })
  @IsEnum(MetricType)
  type: MetricType;
}

export class CreateMetricDto extends TypeMertric {
  @ApiProperty({
    type: Number,
    example: '1',
    description: 'Id of user',
  })
  @IsNumber()
  @IsDefined()
  userId: number;

  @ApiProperty({ type: Number, example: 0 })
  @IsNumber({}, { message: 'Invalid value' })
  @Type(() => Number)
  @Min(0)
  value: number;

  @ApiProperty({
    example: 1718619585,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Invalid timestamp' })
  timestamp: Number;

  @ApiProperty({
    type: String,
    example: [...TEMP_UNIT, ...DISTANCE_UNIT].join('|'),
    description: 'unit',
  })
  @IsNotEmpty()
  unit: DistanceUnit | TemperatureUnit;
}

export class CreateMetricResponseDto extends CreateMetricDto {
  @ApiProperty({
    type: String,
    example: '75a9326a-8c84-4b82-a719-8621b74137bc',
    description: 'Id',
  })
  @IsString()
  @IsDefined()
  id: string;

  static map(params: {
    id: string;
    userId: number;
    type: MetricType;
    value: number;
    timestamp: number;
    unit: DistanceUnit | TemperatureUnit;
  }) {
    const response = new CreateMetricResponseDto();
    response.id = params.id;
    response.userId = params.userId;
    response.type = params.type;
    response.value = params.value;
    response.timestamp = params.timestamp;
    response.unit = params.unit;

    return response;
  }
}

export class GetMetricQuery extends TypeMertric {
  @ApiProperty({
    type: String,
    example: [...TEMP_UNIT, ...DISTANCE_UNIT].join('|'),
    description: 'format unit',
    required: false,
  })
  @IsOptional()
  formatUnit: DistanceUnit | TemperatureUnit;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  page: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  limit: number;
}

export class GetChartQuery extends TypeMertric {
  @ApiProperty({
    type: String,
    example: [...TEMP_UNIT, ...DISTANCE_UNIT].join('|'),
    description: 'format unit',
    required: false,
  })
  @IsOptional()
  formatUnit: DistanceUnit | TemperatureUnit;

  @ApiProperty({
    example: 1718619585,
    required: false,
  })
  @IsNotEmpty()
  from: Number;

  @ApiProperty({
    example: 1718619585,
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  to: Number;
}
