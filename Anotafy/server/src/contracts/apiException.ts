import FieldError from "./fieldError";

export default class ExceptionError extends Error {
    public readonly Status: number;
    public readonly Errors: FieldError[] | undefined;

    constructor(status: number, message: string, erros?: FieldError[]) {
        super(message);

        this.Status = status;
        this.Errors = erros;
        
        Error.captureStackTrace(this, this.constructor);
    }
}