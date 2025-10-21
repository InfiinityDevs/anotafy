import { Notation } from "../baseNotation";
import ExceptionBadRequest from "../exceptions/exceptionBadRequest";

class MinLength extends Notation {
    protected action(value: any, propertyKey: string, length: number): void {
        if (typeof value === 'string' && value.length < length) {
            this.returnError(`O campo ${propertyKey} deve ter no mínimo ${length} caracteres.`);
        }
    }
}

export function minLength(length: number) {
    return function(target: any, propertyKey: string) {
        new MinLength().apply(target, propertyKey,undefined, length);
    }
}
