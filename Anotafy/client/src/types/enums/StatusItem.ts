export const StatusItem = {
    NA_COZINHA: "NA_COZINHA",
    PRONTO: "PRONTO",
    ENTREGUE: "ENTREGUE",
} as const;

export type StatusItem = typeof StatusItem[keyof typeof StatusItem];
