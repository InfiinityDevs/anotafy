export default class StringUtils {
    public static temApenasNumeros = function (value: string): boolean {
        if (value === "") return true;
        return /^\d+$/.test(value);
    };

    public static temApenasNumerosDecimais = function (value: string): boolean {
        if (value === "") return true;
        return /^\d*[,.]?\d+$/.test(value);
    };
}

export {};
