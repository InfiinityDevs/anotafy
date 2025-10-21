import ApiException from "../apiException";
import FieldError from "../fieldError";

export default class ExceptionUnauthorized extends ApiException {
    constructor(message: string, errors?: FieldError[]) {
        super(401, message, errors);
    }
}
