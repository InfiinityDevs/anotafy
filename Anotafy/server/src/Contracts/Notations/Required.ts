import { Notation } from "../BaseNotation";
import ExceptionBadRequest from "../Exceptions/ExceptionBadRequest";

class Required extends Notation {
    protected Action(value: any, propertyKey: string): void {
        if (value === undefined || value === null || value === "") {
            this.ReturnError(`O campo ${propertyKey} é obrigatório!`);
        }
    }
}

export function required(target: any, propertyKey: string) {
    new Required().Apply(target, propertyKey);
}
