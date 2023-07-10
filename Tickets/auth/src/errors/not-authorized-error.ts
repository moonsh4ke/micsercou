import CustomError from './custom-error'

export class NotAuthorizedError extends CustomError {
    status = 401;

    constructor() {
        super('Not authorized');
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeError() {
        return [{message: this.message}]
    }
}
