export const TipoUsuario = {
    ADMINISTRADOR: "ADMINISTRADOR",
    GARCOM: "GARCOM",
    CAIXA: "CAIXA",
} as const; 

export type TipoUsuario = typeof TipoUsuario[keyof typeof TipoUsuario];
