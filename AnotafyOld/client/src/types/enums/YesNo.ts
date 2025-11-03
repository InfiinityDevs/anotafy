export const YesNo = {
    YES: "YES",
    NO: "NO",
} as const; 

export type YesNo = typeof YesNo[keyof typeof YesNo];
