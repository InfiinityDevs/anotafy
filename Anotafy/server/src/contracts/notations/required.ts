import { Notation } from "../baseNotation";
import ExceptionBadRequest from "../exceptions/exceptionBadRequest";

class Required extends Notation {
    protected action(value: any, propertyKey: string): void {
        if (value === undefined || value === null || value === "") {
            this.returnError(`O campo ${propertyKey} é obrigatório!`)
        }
    }
}

export function required(target: any, propertyKey: string) {
    new Required().apply(target, propertyKey);
}