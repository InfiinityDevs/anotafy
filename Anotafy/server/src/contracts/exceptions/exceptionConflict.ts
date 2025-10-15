import ApiException from "../apiException";
import FieldError from "../fieldError";

export default class ExceptionConflict extends ApiException {
    constructor(message: string, errors?: FieldError[]) {
        super(409, message, errors);
    }
}
