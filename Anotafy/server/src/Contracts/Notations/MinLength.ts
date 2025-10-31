import { Notation } from "../BaseNotation";
import ExceptionBadRequest from "../Exceptions/ExceptionBadRequest";

class MinLength extends Notation {
    protected Action(value: any, propertyKey: string, length: number): void {
        if (typeof value === "string" && value.length < length) {
            this.ReturnError(
                `O campo ${propertyKey} deve ter no mínimo ${length} caracteres.`
            );
        }
    }
}

export function minLength(length: number) {
    return function (target: any, propertyKey: string) {
        new MinLength().Apply(target, propertyKey, undefined, length);
    };
}
