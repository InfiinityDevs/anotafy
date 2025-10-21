import ApiException from "../apiException";

export default class ExceptionNotFound extends ApiException {
    constructor(message: string) {
        super(404, message);
    }
}
