export const statusComanda = {
    OCUPADA: 0,
    EM_FECHAMENTO: 1,
    FINALIZADA: 2
} as const;

export type StatusComanda = (typeof statusComanda)[keyof typeof statusComanda];