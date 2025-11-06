"use server";
import { StatusUnidade } from "@/generated/prisma/enums";
import { CreateUnidade } from "@/types/types";
import { prisma } from "@/utils/prisma";

const repo = prisma.unidade;

export async function createUnidade(unidade: CreateUnidade) {
    return await repo.create({
        data: {
            email: unidade.email,
            telefone: unidade.telefone,
            nome: unidade.nome,
            tipo_unidade: unidade.tipo_unidade,
            cnpj: unidade.cnpj,
            cep: unidade.cep,
            logradouro: unidade.logradouro,
            numero: unidade.numero,
            complemento: unidade.complemento,
            bairro: unidade.bairro,
            cidade: unidade.cidade,
            estado: unidade.estado,
            codigo_ibge_municipio: unidade.codigo_ibge_municipio,
            data_abertura: unidade.data_abertura,
            data_cadastro: new Date(),
            data_atualizacao: new Date(),
            status: StatusUnidade.ATIVA,
            empresa_id: unidade.empresa_id,
            matriz_id: unidade.matriz_id,
        },
    });
}
