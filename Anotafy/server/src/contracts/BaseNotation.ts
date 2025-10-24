import ExceptionBadRequest from "./exceptions/ExceptionBadRequest";

export abstract class Notation {
    private ErrorMessage: string = "";

    Apply(
        target: any,
        propertyKey: string,
        errorMessage?: string,
        ...extras: any[]
    ) {
        let valor: any;

        const getter = () => valor;
        const setter = (novoValor: any) => {
            this.Action(novoValor, propertyKey, ...extras);
            valor = novoValor;
        };

        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    }

    ReturnError(message: string = "") {
        if (message !== "") throw new ExceptionBadRequest(message);

        if (this.ErrorMessage !== "")
            throw new ExceptionBadRequest(this.ErrorMessage);

        throw new ExceptionBadRequest("Erro padrão de notação.");
    }

    protected abstract Action(
        value: any,
        propertyKey: string,
        ...extras: any[]
    ): void;
}
