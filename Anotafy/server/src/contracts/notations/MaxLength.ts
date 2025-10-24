import { Notation } from "../BaseNotation";
import ExceptionBadRequest from "../exceptions/ExceptionBadRequest";

class MaxLength extends Notation {
    protected Action(value: any, propertyKey: string, length: number): void {
        if (typeof value === "string" && value.length > length) {
            this.ReturnError(
                `O campo ${propertyKey} não pode ter mais de ${length} caracteres.`
            );
        } else if (typeof value !== "string") {
        }
    }
}

export function maxLength(length: number) {
    return function (target: any, propertyKey: string) {
        new MaxLength().Apply(target, propertyKey, undefined, length); // Pass undefined for errorMessage
    };
}
