export const TipoUnidade = {
    MATRIZ: "MATRIZ",
    FILIAL: "FILIAL",
    ESCRITORIO: "ESCRITORIO",
    DEPOSITO: "DEPOSITO",
} as const; 

export type TipoUnidade = typeof TipoUnidade[keyof typeof TipoUnidade];
