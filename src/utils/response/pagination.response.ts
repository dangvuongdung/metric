import { ApiProperty } from '@nestjs/swagger';

export interface IPaginationModels<T> {
  items: T[];
  total: number;
}

export class PaginationModel<T> {
  @ApiProperty({ isArray: true })
  public readonly items: T[];

  @ApiProperty({ example: 1 })
  public readonly total: number;
}
