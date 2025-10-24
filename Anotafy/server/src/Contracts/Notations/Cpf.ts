import { Notation } from "../BaseNotation";
import ExceptionBadRequest from "../Exceptions/ExceptionBadRequest";

class Cpf extends Notation {
    protected Action(value: any, propertyKey: string): void {
        if (typeof value !== "string") {
            this.ReturnError(`O campo ${propertyKey} deve ser uma string.`);
        }

        const cpfLimpo = value.replace(/[^\d]+/g, "");

        if (cpfLimpo.length !== 11 || /^(\d)\1+$/.test(cpfLimpo)) {
            this.ReturnError(
                `O campo ${propertyKey} não contém um CPF válido.`
            );
        }

        let soma = 0;
        let resto;

        // Validação do primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpfLimpo.substring(9, 10))) {
            this.ReturnError(
                `O campo ${propertyKey} não contém um CPF válido.`
            );
        }

        // Validação do segundo dígito verificador
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpfLimpo.substring(10, 11))) {
            this.ReturnError(
                `O campo ${propertyKey} não contém um CPF válido.`
            );
        }
    }
}

export function cpf(target: any, propertyKey: string) {
    new Cpf().Apply(target, propertyKey);
}
