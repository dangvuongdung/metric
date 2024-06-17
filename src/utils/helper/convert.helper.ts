import {
  DistanceUnit,
  MetricType,
  TemperatureUnit,
} from 'src/modules/metric/types/metric.type';

export const MapingMeter = {
  [DistanceUnit.METER]: 1,
  [DistanceUnit.CENTIMETER]: 100,
  [DistanceUnit.INCH]: 39.37,
  [DistanceUnit.FEET]: 3.2808,
  [DistanceUnit.YARD]: 1.0936,
};

export const convertMetricUnit = (
  type: MetricType,
  from: DistanceUnit | TemperatureUnit,
  to: DistanceUnit | TemperatureUnit,
  amount: number,
): number => {
  if (type === MetricType.DISTANCE) {
    const toMeter = amount / MapingMeter[from];
    return toMeter * MapingMeter[to];
  } else {
    let amountCDegree = amount;
    switch (from) {
      case TemperatureUnit.F:
        amountCDegree = (amount - 32) / 1.8;
      case TemperatureUnit.K:
        amountCDegree = amount - 273.15;
      default:
        amountCDegree = amount;
        break;
    }

    switch (to) {
      case TemperatureUnit.F:
        return amountCDegree * 1.8 + 32;
      case TemperatureUnit.K:
        return amountCDegree + 273.15;
      default:
        return amountCDegree;
    }
  }
};
