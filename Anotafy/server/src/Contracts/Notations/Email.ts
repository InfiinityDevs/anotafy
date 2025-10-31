import { Notation } from "../BaseNotation";

class Email extends Notation {
    protected Action(value: any, propertyKey: string): void {
        if (typeof value !== "string") {
            this.ReturnError(`O campo ${propertyKey} deve ser uma string.`);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            this.ReturnError(
                `O valor fornecido para ${propertyKey} não é um email válido.`
            );
        }
    }
}

export function email(target: any, propertyKey: string) {
    new Email().Apply(target, propertyKey);
}
