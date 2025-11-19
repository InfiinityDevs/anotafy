"use server";

import { prisma } from "@/lib/prisma";
import { Categoria } from "@/types/types";

const repo = prisma.categoria;

interface QtdProdutosPorCategoria {
    categoriaId: number;
    quantidade: number;
}

export async function getAllCategorias() : Promise<Categoria[] | []> {
    try {
        return await repo.findMany({
        orderBy: {
            nome: "asc",
        },
    })
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        throw error;
    }
}

export async function getQtdProdutosPorCategoria() : Promise<QtdProdutosPorCategoria[]> {
    return await prisma.produto.groupBy({
        by: ["categoria_id"],
        _count: {
            categoria_id: true,
        },
        
    }).then((result) => {
        return result.map((item) => {
            return {
                categoriaId: item.categoria_id,
                quantidade: item._count.categoria_id,
            } as QtdProdutosPorCategoria;
        })
    })
}