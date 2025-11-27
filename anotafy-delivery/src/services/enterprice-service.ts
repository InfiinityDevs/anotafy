"use server";

import { RegisterEnterpriceProps } from "@/components/RegisterForm";
import {
    createEnterprice,
    findByCnpjCpf,
} from "@/repositories/enterprice-repository";

export async function verifyCpfCnpjExists(cpfCnpj: string): Promise<boolean> {
    const existing = await findByCnpjCpf(cpfCnpj);

    return !!existing;
}

export async function registerEnterprice(data: RegisterEnterpriceProps) {
    const enterprice = await createEnterprice(data);

    return !!enterprice;
}
