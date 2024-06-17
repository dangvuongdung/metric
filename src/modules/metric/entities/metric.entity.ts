import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  DistanceUnit,
  MetricType,
  TemperatureUnit,
} from '../types/metric.type';

@Entity('metrics')
@Index(['type', 'timestamp'])
export class Metric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: Number, nullable: true })
  userId: number;

  @Column({ type: String, default: MetricType.DISTANCE })
  type: MetricType;

  @Column({ type: 'numeric', default: 0 })
  value: number;

  @Column({ type: String })
  unit: DistanceUnit | TemperatureUnit;

  @Column({ type: String })
  date: string;

  @Column({ type: 'numeric', default: 0 })
  timestamp: Number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
