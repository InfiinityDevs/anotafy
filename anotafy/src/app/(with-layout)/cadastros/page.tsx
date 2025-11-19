"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Package,
    Users,
    Utensils,
    Tag,
    Filter,
    Download,
    ArrowLeft,
    ChefHat,
} from "lucide-react";
import Overflow from "@/components/ui/overflow";
import Link from "next/link";

// region Icones
const Truck = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM12 8h5l-5 6h5m-7-6h.01"
        />
    </svg>
);

const CreditCard = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
    </svg>
);

// endregion

// region Interfaces
interface Produto {
    id: number;
    nome: string;
    categoria: string;
    preco: number;
    estoque: number;
    status: "ativo" | "inativo";
}

interface Mesa {
    id: number;
    numero: number;
    capacidade: number;
    status: "livre" | "ocupada" | "reservada";
    localizacao: string;
}

interface Usuario {
    id: number;
    nome: string;
    email: string;
    cargo: "gerente" | "garcom" | "caixa" | "cozinha";
    status: "ativo" | "inativo";
}

interface CardCadastro {
    id: string;
    titulo: string;
    descricao: string;
    icone: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    cor: string;
    quantidade: number;
}

// endregion

const cardsCadastros: CardCadastro[] = [
    {
        id: "produtos",
        titulo: "Produtos",
        descricao: "Cadastre e gerencie os produtos do cardápio",
        icone: Package,
        cor: "bg-blue-500",
        quantidade: 45,
    },
    {
        id: "categorias",
        titulo: "Categorias",
        descricao: "Organize produtos em categorias",
        icone: Tag,
        cor: "bg-green-500",
        quantidade: 8,
    },
    {
        id: "mesas",
        titulo: "Mesas",
        descricao: "Configure mesas e capacidades",
        icone: Utensils,
        cor: "bg-purple-500",
        quantidade: 12,
    },
    {
        id: "usuarios",
        titulo: "Usuários",
        descricao: "Gerencie acessos ao sistema",
        icone: Users,
        cor: "bg-orange-500",
        quantidade: 6,
    },
    {
        id: "funcionarios",
        titulo: "Funcionários",
        descricao: "Cadastro de colaboradores",
        icone: ChefHat,
        cor: "bg-red-500",
        quantidade: 15,
    },
    {
        id: "fornecedores",
        titulo: "Fornecedores",
        descricao: "Fornecedores e parceiros",
        icone: Truck,
        cor: "bg-indigo-500",
        quantidade: 23,
    },
    {
        id: "formas-pagamento",
        titulo: "Formas de Pagamento",
        descricao: "Configure métodos de pagamento",
        icone: CreditCard,
        cor: "bg-emerald-500",
        quantidade: 5,
    },
];

type TelaAtiva =
    | "menu"
    | "produtos"
    | "categorias"
    | "mesas"
    | "usuarios"
    | "funcionarios"
    | "fornecedores"
    | "formas-pagamento";

export default function CadastrosPage() {
    const [telaAtiva, setTelaAtiva] = useState<TelaAtiva>("menu");
    const [searchTerm, setSearchTerm] = useState("");

    // region Moks
    const produtos: Produto[] = [
        {
            id: 1,
            nome: "Pizza Margherita",
            categoria: "Pizzas",
            preco: 45.9,
            estoque: 50,
            status: "ativo",
        },
        {
            id: 2,
            nome: "Hambúrguer Artesanal",
            categoria: "Lanches",
            preco: 32.5,
            estoque: 30,
            status: "ativo",
        },
        {
            id: 3,
            nome: "Refrigerante 2L",
            categoria: "Bebidas",
            preco: 12.0,
            estoque: 100,
            status: "ativo",
        },
        {
            id: 4,
            nome: "Sorvete Napolitano",
            categoria: "Sobremesas",
            preco: 18.9,
            estoque: 0,
            status: "inativo",
        },
    ];

    const mesas: Mesa[] = [
        {
            id: 1,
            numero: 1,
            capacidade: 4,
            status: "livre",
            localizacao: "Área interna",
        },
        {
            id: 2,
            numero: 2,
            capacidade: 6,
            status: "ocupada",
            localizacao: "Área externa",
        },
        {
            id: 3,
            numero: 3,
            capacidade: 2,
            status: "reservada",
            localizacao: "Área interna",
        },
        {
            id: 4,
            numero: 4,
            capacidade: 8,
            status: "livre",
            localizacao: "Área externa",
        },
    ];

    const usuarios: Usuario[] = [
        {
            id: 1,
            nome: "João Silva",
            email: "joao@restaurante.com",
            cargo: "gerente",
            status: "ativo",
        },
        {
            id: 2,
            nome: "Maria Santos",
            email: "maria@restaurante.com",
            cargo: "garcom",
            status: "ativo",
        },
        {
            id: 3,
            nome: "Pedro Costa",
            email: "pedro@restaurante.com",
            cargo: "cozinha",
            status: "ativo",
        },
        {
            id: 4,
            nome: "Ana Oliveira",
            email: "ana@restaurante.com",
            cargo: "caixa",
            status: "inativo",
        },
    ];

    // endregion

    const getStatusBadge = (status: string) => {
        const variants = {
            ativo: "bg-green-100 text-green-800",
            inativo: "bg-red-100 text-red-800",
            livre: "bg-blue-100 text-blue-800",
            ocupada: "bg-orange-100 text-orange-800",
            reservada: "bg-purple-100 text-purple-800",
        };
        return (
            variants[status as keyof typeof variants] ||
            "bg-gray-100 text-gray-800"
        );
    };

    const getCargoBadge = (cargo: string) => {
        const variants = {
            gerente: "bg-purple-100 text-purple-800",
            garcom: "bg-blue-100 text-blue-800",
            caixa: "bg-green-100 text-green-800",
            cozinha: "bg-orange-100 text-orange-800",
        };
        return (
            variants[cargo as keyof typeof variants] ||
            "bg-gray-100 text-gray-800"
        );
    };

    const renderConteudo = () => {
        if (telaAtiva === "menu") {
            return (
                <div className="space-y-6 p-6">
                    {/* Cabeçalho */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Cadastros
                            </h1>
                            <p className="text-gray-600">
                                Selecione o tipo de cadastro que deseja
                                gerenciar
                            </p>
                        </div>
                        <Badge
                            variant="secondary"
                            className="text-lg px-3 py-1"
                        >
                            Total:{" "}
                            {cardsCadastros.reduce(
                                (acc, card) => acc + card.quantidade,
                                0
                            )}{" "}
                            registros
                        </Badge>
                    </div>

                    {/* Grid de Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {cardsCadastros.map((card) => {
                            const Icon = card.icone;
                            return (
                                <Link
                                    href={"/cadastros/" + card.id}
                                    key={card.id}
                                >
                                    <Card
                                        className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-gray-100 hover:border-gray-300"
                                        onClick={() =>
                                            setTelaAtiva(card.id as TelaAtiva)
                                        }
                                    >
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <div
                                                    className={`p-3 rounded-lg ${card.cor}`}
                                                >
                                                    <Icon className="h-6 w-6 text-white" />
                                                </div>
                                                <Badge
                                                    variant="secondary"
                                                    className="text-sm"
                                                >
                                                    {card.quantidade}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-xl">
                                                {card.titulo}
                                            </CardTitle>
                                            <CardDescription className="text-base">
                                                {card.descricao}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center text-sm text-blue-600 font-medium">
                                                <span>Gerenciar</span>
                                                <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Estatísticas Rápidas */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Visão Geral dos Cadastros</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {cardsCadastros[0].quantidade}
                                    </div>
                                    <div className="text-sm text-blue-800">
                                        Produtos Ativos
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">
                                        {cardsCadastros[2].quantidade}
                                    </div>
                                    <div className="text-sm text-green-800">
                                        Mesas Disponíveis
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-orange-50 rounded-lg">
                                    <div className="text-2xl font-bold text-orange-600">
                                        {cardsCadastros[3].quantidade}
                                    </div>
                                    <div className="text-sm text-orange-800">
                                        Usuários Ativos
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-purple-50 rounded-lg">
                                    <div className="text-2xl font-bold text-purple-600">
                                        {cardsCadastros[1].quantidade}
                                    </div>
                                    <div className="text-sm text-purple-800">
                                        Categorias
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            );
        }

        // Conteúdo específico para cada tipo de cadastro
        return (
            <div className="space-y-6">
                {/* Cabeçalho com botão voltar */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={() => setTelaAtiva("menu")}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Voltar
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {
                                    cardsCadastros.find(
                                        (card) => card.id === telaAtiva
                                    )?.titulo
                                }
                            </h1>
                            <p className="text-gray-600">
                                {
                                    cardsCadastros.find(
                                        (card) => card.id === telaAtiva
                                    )?.descricao
                                }
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <Download className="h-4 w-4" />
                            Exportar
                        </Button>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Novo
                        </Button>
                    </div>
                </div>

                {/* Barra de Pesquisa */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Pesquisar..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2"
                            >
                                <Filter className="h-4 w-4" />
                                Filtros
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Conteúdo específico */}
                {renderConteudoEspecifico()}
            </div>
        );
    };

    const renderConteudoEspecifico = () => {
        switch (telaAtiva) {
            case "produtos":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Produtos Cadastrados</CardTitle>
                            <CardDescription>
                                Gerencie todos os produtos do seu cardápio
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Produto</TableHead>
                                        <TableHead>Categoria</TableHead>
                                        <TableHead>Preço</TableHead>
                                        <TableHead>Estoque</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Ações
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {produtos.map((produto) => (
                                        <TableRow key={produto.id}>
                                            <TableCell className="font-medium">
                                                {produto.nome}
                                            </TableCell>
                                            <TableCell>
                                                {produto.categoria}
                                            </TableCell>
                                            <TableCell>
                                                R$ {produto.preco.toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                {produto.estoque} unidades
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={getStatusBadge(
                                                        produto.status
                                                    )}
                                                >
                                                    {produto.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-red-600"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                );

            case "categorias":
                <div>teste</div>;

            case "mesas":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Mesas do Restaurante</CardTitle>
                            <CardDescription>
                                Configure as mesas e suas capacidades
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Número</TableHead>
                                        <TableHead>Capacidade</TableHead>
                                        <TableHead>Localização</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Ações
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mesas.map((mesa) => (
                                        <TableRow key={mesa.id}>
                                            <TableCell className="font-medium">
                                                Mesa {mesa.numero}
                                            </TableCell>
                                            <TableCell>
                                                {mesa.capacidade} pessoas
                                            </TableCell>
                                            <TableCell>
                                                {mesa.localizacao}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={getStatusBadge(
                                                        mesa.status
                                                    )}
                                                >
                                                    {mesa.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-red-600"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                );

            case "usuarios":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Usuários do Sistema</CardTitle>
                            <CardDescription>
                                Gerencie os acessos e permissões
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Cargo</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Ações
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {usuarios.map((usuario) => (
                                        <TableRow key={usuario.id}>
                                            <TableCell className="font-medium">
                                                {usuario.nome}
                                            </TableCell>
                                            <TableCell>
                                                {usuario.email}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={getCargoBadge(
                                                        usuario.cargo
                                                    )}
                                                >
                                                    {usuario.cargo}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={getStatusBadge(
                                                        usuario.status
                                                    )}
                                                >
                                                    {usuario.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-red-600"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                );

            default:
                return (
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold">
                                Cadastro em Desenvolvimento
                            </h3>
                            <p className="text-gray-600">
                                Esta funcionalidade estará disponível em breve.
                            </p>
                        </CardContent>
                    </Card>
                );
        }
    };

    return <Overflow>{renderConteudo()}</Overflow>;
}
