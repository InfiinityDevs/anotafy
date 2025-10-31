import ExceptionBadRequest from "../Exceptions/ExceptionBadRequest";
import FieldError from "../FieldError";

export function ValidateInput<T extends new (...args: any[]) => any>(
    constructor: T
) {
    return class extends constructor {
        constructor(...args: any[]) {
            const dataInput = args[0];

            // Validação apenas se data for um objeto
            if (dataInput && typeof dataInput === "object") {
                // Cria uma instância temporária para obter as propriedades esperadas
                const expectedProperties = Object.keys(constructor.prototype);
                const data = Object.keys(dataInput);

                const listErrors: FieldError[] = [];

                for (const prop of expectedProperties) {
                    if (
                        !data.includes(
                            prop.charAt(0).toLowerCase() + prop.slice(1)
                        )
                    ) {
                        listErrors.push(
                            new FieldError(
                                prop.toString().toLowerCase(),
                                `Propriedade ausente no objeto de entrada: ${prop
                                    .toString()
                                    .toLowerCase()}`
                            )
                        );
                    }
                }

                for (const prop of data) {
                    if (
                        !expectedProperties.includes(
                            prop.charAt(0).toUpperCase() + prop.slice(1)
                        )
                    ) {
                        listErrors.push(
                            new FieldError(
                                prop,
                                `Propriedade desconhecida no objeto de entrada: ${prop}`
                            )
                        );
                    }
                }

                if (listErrors.length > 0) {
                    throw new ExceptionBadRequest(
                        "Erros de validação",
                        listErrors
                    );
                }
            }

            super(...args);
        }
    };
}
