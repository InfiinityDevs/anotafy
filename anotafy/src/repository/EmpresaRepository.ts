"use server";
import { CreateEmpresa, StatusEmpresa } from "@/types/types";
import { prisma } from "@/lib/prisma";

const repo = prisma.empresa;

export async function createEmpresa(empresa: CreateEmpresa) {
    return await repo.create({
        data: {
            email_principal: empresa.email_principal,
            telefone_principal: empresa.telefone_principal,
            razao_social: empresa.razao_social,
            nome_fantasia: empresa.nome_fantasia,
            cnpj_raiz: empresa.cnpj_raiz,
            data_fundacao: empresa.data_fundacao,
            cnae_principal: empresa.cnae_principal,
            website: empresa.website,
            logo_url: empresa.logo_url,
            data_atualizacao: new Date(),
            data_cadastro: new Date(),
            status: StatusEmpresa.ATIVA,
        },
    });
}
