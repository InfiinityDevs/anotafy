export const StatusEmpresa = {
    ATIVA: "ATIVA",
    INATIVA: "INATIVA",
    SUSPENSA: "SUSPENSA",
} as const;

export type StatusEmpresa = typeof StatusEmpresa[keyof typeof StatusEmpresa];