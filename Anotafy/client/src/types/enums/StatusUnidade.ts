export const StatusUnidade = {
    ATIVA: "ATIVA",
    INATIVA: "INATIVA",
    EM_REFORMA: "EM_REFORMA",
} as const;

export type StatusUnidade = typeof StatusUnidade[keyof typeof StatusUnidade];
