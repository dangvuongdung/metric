export enum MetricType {
  DISTANCE = 'DISTANCE',
  TEMPERATURE = 'TEMPERATURE',
}

export enum DistanceUnit {
  METER = 'METER',
  CENTIMETER = 'CENTIMETER',
  INCH = 'INCH',
  FEET = 'FEET',
  YARD = 'YARD',
}

export enum TemperatureUnit {
  C = 'C',
  F = 'F',
  K = 'K',
}

export const DISTANCE_UNIT = Object.values(DistanceUnit);
export const TEMP_UNIT = Object.values(TemperatureUnit);
