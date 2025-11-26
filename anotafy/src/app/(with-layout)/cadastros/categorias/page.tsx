import { YesNo } from "@/types/types";
import CategoriaClient from "./CategoriaClient";
import {
    getAllCategorias,
    getQtdProdutosVendidoPorCategoria,
} from "@/repository/CategoriaRepository";
import LoadingServer from "../../../../components/loading";

interface DataTableCategoria {
    id: number;
    categoriaName: string;
    categoriaSuperior: string | null;
    produtosVinculados: number;
    status: YesNo;
}

export interface DataCategoria {
    totalCadastros: number;
    emDestaque: string;
    baixaAtividade: string;
    TableCategoria: DataTableCategoria[];
}

export default function CategoriaPage() {
    return (
        <LoadingServer>
            <CategoriaContent />
        </LoadingServer>
    );
}

async function CategoriaContent() {
    const [categorias, produtosPorCategoria] = await Promise.all([
        getAllCategorias(),
        getQtdProdutosVendidoPorCategoria(),
    ]);

    console.log("Produtos Vendidos Por Categoria:", );

    const data: DataCategoria = {
        totalCadastros: categorias.length,
        emDestaque: "",
        baixaAtividade: "Hobbies",
        TableCategoria: categorias.map((categoria) => {
            const produtosVinculados =
                produtosPorCategoria.find(
                    (item) => item.categoriaId === categoria.id
                )?.quantidade ?? 0;

            return {
                id: categoria.id,
                categoriaName: categoria.nome,
                categoriaSuperior: categoria.pai?.nome || null,
                produtosVinculados,
                status: categoria.status as YesNo,
            };
        }),
    };

    return <CategoriaClient data={data} />;
}
