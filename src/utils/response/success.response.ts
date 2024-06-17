/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class ErrorResponse<T> {
  @ApiProperty({ example: 200 })
  status: number | null;

  @ApiProperty()
  errors: T;
}

export class SuccessNoContentResponse {
  @ApiProperty({ example: 200 })
  status: number;
  @ApiProperty({ example: null })
  data: any;
}

export class SuccessResponse<T> {
  @ApiProperty({ example: 200 })
  status: number | null;

  @ApiProperty()
  data: T;
}

export const ResponseSuccess = <T>(
  data: T,
  status: number,
): SuccessResponse<T> => {
  return {
    status,
    data,
  };
};
