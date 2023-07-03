abstract class CustomError extends Error {
  abstract status: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeError(): {message: string; field?: string}[];
}

export default CustomError;
