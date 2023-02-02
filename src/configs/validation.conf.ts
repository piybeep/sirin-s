import { ValidationError } from '@nestjs/common';
import { ValidationOptions } from 'class-validator';

export interface ValidationPipeOptions extends ValidationOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}
