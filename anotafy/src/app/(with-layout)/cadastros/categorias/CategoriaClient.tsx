"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Overflow from "@/components/ui/overflow";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { YesNo } from "@/types/types";
import {
    Filter,
    ListTodo,
    Plus,
    Search,
    Snail,
    SquarePen,
    Star,
    Trash2Icon,
} from "lucide-react";
import { DataCategoria } from "./page";
import { cn } from "@/lib/utils";

export default function CategoriaClient({ data }: { data: DataCategoria }) {
    return (
        <Overflow>
            <div className="p-4 flex flex-col gap-4 ">
                {/* Titulo pagina */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold">Categorias</h1>
                    <p>Gerencie as categorias dos seus produtos aqui.</p>
                </div>
                {/* Cards de Informações */}
                <div className="flex w-full flex-wrap gap-4">
                    <Card className="flex-1 flex flex-col justify-between min-w-[180px] p-4 border border-gray-200 rounded-lg bg-white">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Total Cadastradas
                            </span>
                            <ListTodo className="w-5 h-5 text-indigo-400 shrink-0" />
                        </div>

                        <div className="text-center">
                            <span className="text-3xl font-bold text-indigo-700">
                                {data.totalCadastros}
                            </span>
                            <span className="text-gray-500 ml-1">
                                categorias
                            </span>
                        </div>
                    </Card>

                    <Card className="flex-1 flex flex-col justify-between min-w-[180px] p-4 border border-gray-200 rounded-lg bg-white">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Destaque do Mês
                            </span>
                            <Star className="w-5 h-5 text-amber-500 shrink-0 fill-amber-500" />
                        </div>

                        <div>
                            <span className="text-center text-2xl font-bold text-gray-800 truncate block">
                                {data.emDestaque}
                            </span>
                        </div>
                    </Card>

                    <Card className="flex-1 flex flex-col justify-between min-w-[180px] p-4 border border-gray-200 rounded-lg bg-white">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Baixa Atividade do Mês
                            </span>
                            <Snail className="w-5 h-5 text-gray-400 shrink-0" />
                        </div>

                        <div>
                            <span className="text-center text-2xl font-bold text-gray-600 truncate block">
                                {data.baixaAtividade}
                            </span>
                        </div>
                    </Card>
                </div>
                {/* Manter categorias */}
                <Card className="p-4">
                    {/* Header de categorias */}
                    <div className=" flex flex-row gap-2 w-full">
                        <div className="relative flex items-center w-full">
                            <Search className="absolute left-1 text-gray-500" />
                            <Input
                                className="px-8"
                                placeholder="Buscar por categoria..."
                            />
                        </div>
                        <Button variant={"outline"} className="border-gray-300">
                            <Filter />
                            Filtro
                        </Button>
                        <Button>
                            <Plus strokeWidth={3} />
                            Nova Categoria
                        </Button>
                    </div>
                    {/* Tabela de categorias */}
                    <div className="w-full p-0 overflow-hidden border shadow rounded-md">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow className="bg-gray-100 hover:bg-gray-100">
                                    <TableHead className=" border-r">
                                        Categoria
                                    </TableHead>
                                    <TableHead className=" border-r">
                                        Categoria Superior
                                    </TableHead>
                                    <TableHead className=" border-r text-center">
                                        Produtos Viculados
                                    </TableHead>
                                    <TableHead className=" border-r text-center">
                                        Status
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Ações
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.TableCategoria.map((categoria) => {
                                    return (
                                        <TableRow
                                            key={categoria.id}
                                            className="hover:bg-transparent"
                                        >
                                            <TableCell>
                                                {" "}
                                                {categoria.categoria}{" "}
                                            </TableCell>
                                            <TableCell>
                                                {categoria.categoriaSuperior ??
                                                    "Nenhuma"}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {categoria.produtosVinculados}
                                            </TableCell>
                                            <TableCell className="items-end">
                                                <div className="flex items-center justify-center">
                                                    <div
                                                        className={cn(
                                                            "px-2 py-1 rounded-full font-semibold",
                                                            categoria.status ===
                                                                YesNo.YES
                                                                ? "bg-green-200 text-green-800"
                                                                : "bg-red-200 text-red-800"
                                                        )}
                                                    >
                                                        {categoria.status ===
                                                        YesNo.YES
                                                            ? "Ativo"
                                                            : "Inativo"}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-row gap-3 items-center justify-center">
                                                    <button
                                                        className="
                                                            p-1.5 rounded-md
                                                            text-gray-500 hover:text-blue-600
                                                            hover:bg-blue-50
                                                            border border-transparent hover:border-blue-200
                                                            transition-all duration-150
                                                            focus:outline-none focus:ring-1 focus:ring-blue-500
                                                        "
                                                        title="Editar"
                                                    >
                                                        <SquarePen size={18} />
                                                    </button>

                                                    <button
                                                        className="
                                                            p-1.5 rounded-md
                                                            text-gray-500 hover:text-red-600
                                                            hover:bg-red-50
                                                            border border-transparent hover:border-red-200
                                                            transition-all duration-150
                                                            focus:outline-none focus:ring-1 focus:ring-red-500
                                                        "
                                                        title="Excluir"
                                                    >
                                                        <Trash2Icon size={18} />
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            </div>
        </Overflow>
    );
}
