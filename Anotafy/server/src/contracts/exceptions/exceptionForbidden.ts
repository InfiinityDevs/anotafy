import ApiException from "../apiException";

export default class ExceptionForbidden extends ApiException {
    constructor(message: string) {
        super(403, message);
    }
}
