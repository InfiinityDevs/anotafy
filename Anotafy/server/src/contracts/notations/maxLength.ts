import { Notation } from "../baseNotation";
import ExceptionBadRequest from "../exceptions/exceptionBadRequest";

class MaxLength extends Notation {
    protected action(value: any, propertyKey: string, length: number): void {
        if (typeof value === 'string' && value.length > length) {
            this.returnError(`O campo ${propertyKey} não pode ter mais de ${length} caracteres.`);
        } else if (typeof value !== 'string') {
        }
    }
}

export function maxLength(length: number) {
    return function(target: any, propertyKey: string) {
        new MaxLength().apply(target, propertyKey, undefined, length); // Pass undefined for errorMessage
    }
}
