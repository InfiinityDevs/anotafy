import ApiException from "../ApiException";

export default class ExceptionForbidden extends ApiException {
    constructor(message: string) {
        super(403, message);
    }
}
