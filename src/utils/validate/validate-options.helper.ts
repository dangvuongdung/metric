import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  // exceptionFactory: (errors: ValidationError[]) =>
  //   new HttpException(
  //     {
  //       status: HttpStatus.UNPROCESSABLE_ENTITY,
  //       errors: errors.reduce(
  //         (accumulator, currentValue) => ({
  //           ...accumulator,
  //           [currentValue.property]: Object.values(
  //             currentValue.constraints ?? {},
  //           ).join(', '),
  //         }),
  //         {},
  //       ),
  //     },
  //     HttpStatus.UNPROCESSABLE_ENTITY,
  //   ),
  exceptionFactory: (errors: ValidationError[]) => {
    // return new HttpException(
    //   {
    //     status: HttpStatus.UNPROCESSABLE_ENTITY,
    //     errors: errors.reduce(
    //       (accumulator, currentValue) => ({
    //         ...accumulator,
    //         [currentValue.property]: Object.values(
    //           currentValue.constraints ?? {},
    //         ).join(', '),
    //       }),
    //       {},
    //     ),
    //   },
    //   HttpStatus.UNPROCESSABLE_ENTITY,
    // );

    return new HttpException(
      {
        error: 'validationFailed',
        message: Object.values(errors[0]?.constraints ?? {}).join(','),
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  },
};

export default validationOptions;
