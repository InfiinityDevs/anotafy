"use server";

import { Categoria } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";


const repo = prisma.categoria;

export interface QtdProdutosPorCategoria {
    categoriaId: number;
    quantidade: number;
}

export async function getAllCategorias() : Promise<Array<Categoria & { pai: Categoria | null }>> {
    try {
        return await repo.findMany({
            orderBy: {
                nome: "asc",
            },
            include: {
                pai: true,
            },
        });
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        throw error;
    }
}

export async function getQtdProdutosVendidoPorCategoria(): Promise<QtdProdutosPorCategoria[]> {
    try {
        const result = await prisma.$queryRaw<QtdProdutosPorCategoria[]>`
            SELECT 
                c.id AS categoriaId, 
                COUNT(pv.id) AS quantidade
            FROM 
                Categoria c
            LEFT JOIN 
                Produto p ON p.categoriaId = c.id
            LEFT JOIN 
                ProdutoVendido pv ON pv.produtoId = p.id
            GROUP BY 
                c.id
        `;
        return result;
    } catch (error) {
        console.error("Erro ao buscar quantidade de produtos vendidos por categoria:", error);
        throw error;
    }
}


