import ApiException from "../ApiException";
import FieldError from "../FieldError";

export default class ExceptionBadRequest extends ApiException {
    constructor(message: string, errors?: FieldError[]) {
        super(400, message, errors);
    }
}
