import ExceptionBadRequest from "./exceptions/exceptionBadRequest";

export abstract class Notation {
    private ErrorMessage: string = ""; 

    apply(target: any, propertyKey: string, errorMessage?: string, ...extras: any[]) {
        let valor: any;

        const getter = () => valor;
        const setter = (novoValor: any) => {
            this.action(novoValor, propertyKey, ...extras);
            valor = novoValor;
        };

        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    }

    returnError(message: string = "") {
        if (message !== "")
            throw new ExceptionBadRequest(message);

        if (this.ErrorMessage !== "")
            throw new ExceptionBadRequest(this.ErrorMessage);
        
        throw new ExceptionBadRequest("Erro padrão de notação.");
        
    }

    protected abstract action(
        value: any,
        propertyKey: string,
        ...extras: any[]
    ): void;
}
