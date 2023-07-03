import CustomError from './custom-error'

export default class DBError extends CustomError {
  status = 500

  constructor() {
    super('Error connecting to DB');
    Object.setPrototypeOf(this, DBError.prototype);
  }

  serializeError(): { message: string; field?: string | undefined; }[] {
      return [{message: this.message}];
  }
}
