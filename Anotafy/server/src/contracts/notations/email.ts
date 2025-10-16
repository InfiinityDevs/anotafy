import { Notation } from "../baseNotation";
import ExceptionBadRequest from "../exceptions/exceptionBadRequest";

class Email extends Notation {
    protected action(value: any, propertyKey: string): void {
        if (typeof value !== 'string') {
            this.returnError(`O campo ${propertyKey} deve ser uma string.`);
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            this.returnError(`O valor fornecido para ${propertyKey} não é um email válido.`);
        }
    }
}

export function email(target: any, propertyKey: string) {
    new Email().apply(target, propertyKey);
}
