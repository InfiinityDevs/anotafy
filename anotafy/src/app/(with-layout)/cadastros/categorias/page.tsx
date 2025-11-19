import { YesNo } from "@/types/types";
import CategoriaClient from "./CategoriaClient";
import { getAllCategorias } from "@/repository/CategoriaRepository";
import { getQtdProdutosVendidos } from "@/repository/ProdutoRepository";
import LoadingServer from "../../../../components/loading";

interface DataTableCategoria {
    id: number;
    categoria: string;
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
            <CategoriaContent/>
        </LoadingServer>
    );
}

async function CategoriaContent() {
    const categorias = await getAllCategorias();
    const produtosVendidos = await getQtdProdutosVendidos();
    const qtdProdutosPorCategoria = await getQtdProdutosVendidos();

    console.log(categorias);
    console.log(produtosVendidos);
    console.log(qtdProdutosPorCategoria);

    const data: DataCategoria = {
        totalCadastros: categorias.length,
        emDestaque: "Alimentação",
        baixaAtividade: "Hobbies",
        TableCategoria: [
            {
                id: 1,
                categoria: "Bebidas",
                categoriaSuperior: null,
                produtosVinculados: 15,
                status: YesNo.YES,
            },
        ],
    };

    return ( <CategoriaClient data={data} /> );
}
