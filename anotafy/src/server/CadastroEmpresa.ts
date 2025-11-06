"use server";

import { Empresa, Unidade } from "@/generated/prisma/client";
import { createEmpresa } from "@/repository/EmpresaRepository";
import { createUnidade } from "@/repository/UnidadeRepository";
import { createUsuario } from "@/repository/UsuarioRepository";
import { CreateEmpresa, CreateUnidade, CreateUsuario } from "@/types/types";

export async function cadastrarEmpresa({
    empresa,
    unidade,
    usuario,
}: {
    empresa: CreateEmpresa;
    unidade: CreateUnidade;
    usuario: CreateUsuario;
}) {
    try {
        const empresaCreated: Empresa = await createEmpresa(empresa);
        unidade.empresa_id = empresaCreated.id;
        const unidadeCreated: Unidade = await createUnidade(unidade);
        usuario.unidade_id = unidadeCreated.id;
        await createUsuario(usuario);

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
