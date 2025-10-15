import ApiException from "../apiException";
import FieldError from "../fieldError";

export default class ExceptionBadRequest extends ApiException {
    constructor(message: string, errors?: FieldError[]) {
        super(400, message, errors);
    }
}
