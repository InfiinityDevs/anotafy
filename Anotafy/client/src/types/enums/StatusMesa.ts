export const statusMesa = {
    LIVRE : "LIVRE",
    OCUPADA : "OCUPADA",
    EM_FECHAMENTO : "EM_FECHAMENTO",
    AGUARDANDO_LIMPEZA : "AGUARDANDO_LIMPEZA",
    RESERVADA : "RESERVADA",
    BLOQUEADA : "BLOQUEADA",
} as const;

export type StatusMesa = (typeof statusMesa)[keyof typeof statusMesa];

