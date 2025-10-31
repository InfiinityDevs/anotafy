import ApiException from "../ApiException";
import FieldError from "../FieldError";

export default class ExceptionConflict extends ApiException {
    constructor(message: string, errors?: FieldError[]) {
        super(409, message, errors);
    }
}
