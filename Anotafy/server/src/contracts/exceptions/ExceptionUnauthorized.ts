import ApiException from "../ApiException";
import FieldError from "../FieldError";

export default class ExceptionUnauthorized extends ApiException {
    constructor(message: string, errors?: FieldError[]) {
        super(401, message, errors);
    }
}
