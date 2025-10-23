export const statusMesa = {
    LIVRE: 0,
    OCUPADA: 1,
    EM_FECHAMENTO: 2,
    AGUARDANDO_LIMPEZA: 3,
    RESERVADA: 4,
    BLOQUEADA: 5,
} as const;

export type StatusMesa = (typeof statusMesa)[keyof typeof statusMesa];

