"use server";
import { YesNo } from "@/generated/prisma/enums";
import { CreateUsuario } from "@/types/types";
import { prisma } from "@/utils/prisma";

const repo = prisma.usuario;

export async function createUsuario(usuario: CreateUsuario) {
    return await repo.create({
        data: {
            codigo_identificacao: usuario.codigo_identificacao,
            login: usuario.login,
            nome: usuario.nome,
            senha: usuario.senha,
            unidade_id: usuario.unidade_id,
            data_atualizacao: new Date(),
            data_cadastro: new Date(),
            status: YesNo.YES,
        },
    });
}

export async function findUsuarioByLogin(login: string) {
    return repo.findFirst({
        where: {
            login,
        },
    });
}
