import CustomError from './custom-error'

export class BadRequestError extends CustomError {
  status = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError() {
    return [{message: this.message}];
  }
}
