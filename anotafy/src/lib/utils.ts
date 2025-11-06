import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// enums/utils.ts
export class EnumUtils {
    // Obter array de valores do enum
    static getValues<T extends Record<string, string | number>>(
        enumObj: T
    ): Array<T[keyof T]> {
        return Object.values(enumObj).filter(
            (value) => typeof value === "string"
        ) as Array<T[keyof T]>;
    }

    // Obter array de objetos { label, value } para selects
    static getOptions<T extends Record<string, string>>(
        enumObj: T
    ): Array<{ label: string; value: T[keyof T] }> {
        return this.getValues(enumObj).map((value) => ({
            label: this.formatLabel(String(value)),
            value: value as T[keyof T],
        }));
    }

    // Formatar label para exibição (converte SNAKE_CASE para "Snake Case")
    static formatLabel(value: string): string {
        return value
            .toLowerCase()
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    // Validar se valor pertence ao enum
    static isValid<T extends Record<string, string>>(
        enumObj: T,
        value: string
    ): boolean {
        return this.getValues(enumObj).includes(value as T[keyof T]);
    }

    // Obter label formatado de um valor
    static getLabel<T extends Record<string, string>>(
        enumObj: T,
        value: T[keyof T]
    ): string {
        return this.formatLabel(String(value));
    }
}
