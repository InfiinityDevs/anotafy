"use server";

import { prisma } from "@/lib/prisma";

interface QtdProdutosVendidos {
    produto: string;
    quantidadeVendida: number;
}

export async function getQtdProdutosVendidos(): Promise<QtdProdutosVendidos[]> {
    return await prisma.$queryRaw<QtdProdutosVendidos[]>`
    SELECT 
      p.nome as produto,
      SUM(ic.quantidade) as "quantidadeVendida"
    FROM "ItemComanda" ic
    INNER JOIN "Produto" p ON p.id = ic.produto_id
    GROUP BY p.id, p.nome
    ORDER BY "quantidadeVendida" DESC
  `;
}
