import CustomError from './custom-error'
import {FieldValidationError, ValidationError} from 'express-validator'

class CustomValidationError extends CustomError{
  status: number = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid username or password")
    Object.setPrototypeOf(this, CustomValidationError.prototype)
  }

  serializeError() {
    return this.errors.map(err => {
      const ferr =  err as FieldValidationError;
      return {message: ferr.msg, field: ferr.path}
    })
  }
}

export default CustomValidationError;
