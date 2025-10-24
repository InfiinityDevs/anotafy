import { Notation } from "../BaseNotation";
import ExceptionBadRequest from "../exceptions/ExceptionBadRequest";

class Cnpj extends Notation {
    protected Action(value: any, propertyKey: string): void {
        if (typeof value !== "string") {
            this.ReturnError(`O campo ${propertyKey} deve ser uma string.`);
        }

        const cnpjLimpo = value.replace(/[^\d]+/g, "");

        if (cnpjLimpo.length !== 14 || /^(\d)\1+$/.test(cnpjLimpo)) {
            this.ReturnError(
                `O campo ${propertyKey} não contém um CNPJ válido.`
            );
        }

        let tamanho = cnpjLimpo.length - 2;
        let numeros = cnpjLimpo.substring(0, tamanho);
        const digitos = cnpjLimpo.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(0))) {
            this.ReturnError(
                `O campo ${propertyKey} não contém um CNPJ válido.`
            );
        }

        tamanho = tamanho + 1;
        numeros = cnpjLimpo.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(1))) {
            this.ReturnError(
                `O campo ${propertyKey} não contém um CNPJ válido.`
            );
        }
    }
}

export function cnpj(target: any, propertyKey: string) {
    new Cnpj().Apply(target, propertyKey);
}
