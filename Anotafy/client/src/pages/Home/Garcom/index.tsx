import { useState } from "react";
import { statusMesa, type StatusMesa } from "../../../types/enums/StatusMesa";
import Input from "../../../components/Input";
import { Filter, Search } from "lucide-react";
import CustomButton from "../../../components/CustomButton";
import Card from "../../../components/Card";
import { formatDate } from "../../../utils/formatDate";

interface IMesa {
    id: number;
    identificacao: string;
    status: StatusMesa;
    capacidade?: number;
    pessoas?: number;
    horaAbertura?: Date;
    totalMesa?: number;
}

export const mockMesas: IMesa[] = [
    {
        id: 1,
        identificacao: "Mesa 01 - Janela",
        status: statusMesa.LIVRE,
        capacidade: 4,
        pessoas: undefined,
        horaAbertura: undefined,
        totalMesa: 0,
    },
    {
        id: 2,
        identificacao: "Mesa 02 - Centro",
        status: statusMesa.OCUPADA,
        capacidade: 6,
        pessoas: 4,
        horaAbertura: new Date("2024-01-20 19:30:00"),
        totalMesa: 152.5,
    },
    {
        id: 3,
        identificacao: "Mesa 03 - Varanda",
        status: statusMesa.OCUPADA,
        capacidade: 4,
        pessoas: 2,
        horaAbertura: new Date("2024-01-20T20:15:00"),
        totalMesa: 87.9,
    },
    {
        id: 4,
        identificacao: "Mesa 04 - Jardim",
        status: statusMesa.EM_FECHAMENTO,
        capacidade: 8,
        pessoas: 3,
        horaAbertura: new Date("2024-01-20T18:45:00"),
        totalMesa: 234.75,
    },
    {
        id: 5,
        identificacao: "Mesa 05 - Canto",
        status: statusMesa.AGUARDANDO_LIMPEZA,
        capacidade: 4,
        pessoas: undefined,
        horaAbertura: undefined,
        totalMesa: 0,
    },
    {
        id: 6,
        identificacao: "Mesa 06 - Privativa",
        status: statusMesa.RESERVADA,
        capacidade: 10,
        pessoas: undefined,
        horaAbertura: new Date("2024-01-20T21:00:00"),
        totalMesa: 0,
    },
    {
        id: 7,
        identificacao: "Mesa 07 - Manutenção",
        status: statusMesa.BLOQUEADA,
        capacidade: 4,
        pessoas: undefined,
        horaAbertura: undefined,
        totalMesa: 0,
    },
    {
        id: 8,
        identificacao: "Mesa 08 - Central",
        status: statusMesa.LIVRE,
        capacidade: 6,
        pessoas: undefined,
        horaAbertura: undefined,
        totalMesa: 0,
    },
    {
        id: 9,
        identificacao: "Mesa VIP 01 - Área Nobre",
        status: statusMesa.OCUPADA,
        capacidade: 12,
        pessoas: 6,
        horaAbertura: new Date("2024-01-20T19:00:00"),
        totalMesa: 589.3,
    },
    {
        id: 10,
        identificacao: "Mesa VIP 02 - Vista Mar",
        status: statusMesa.LIVRE,
        capacidade: 8,
        pessoas: undefined,
        horaAbertura: undefined,
        totalMesa: 0,
    },
    {
        id: 11,
        identificacao: "Mesa 09 - Balcão",
        status: statusMesa.OCUPADA,
        capacidade: 2,
        pessoas: 1,
        horaAbertura: new Date("2024-01-20T20:30:00"),
        totalMesa: 45.2,
    },
    {
        id: 12,
        identificacao: "Mesa 10 - Entrada",
        status: statusMesa.LIVRE,
        capacidade: 4,
        pessoas: undefined,
        horaAbertura: undefined,
        totalMesa: 0,
    },
    {
        id: 13,
        identificacao: "Mesa 11 - Fundos",
        status: statusMesa.OCUPADA,
        capacidade: 6,
        pessoas: 5,
        horaAbertura: new Date("2025-10-22T19:30:00"),
        totalMesa: 198.6,
    },
    {
        id: 14,
        identificacao: "Mesa 12 - Pérgola",
        status: statusMesa.LIVRE,
        capacidade: 4,
        pessoas: undefined,
        horaAbertura: undefined,
        totalMesa: 0,
    },
    {
        id: 15,
        identificacao: "Mesa 13 - Solário",
        status: statusMesa.RESERVADA,
        capacidade: 8,
        pessoas: undefined,
        horaAbertura: new Date("2025-10-22T19:30:00"),
        totalMesa: 0,
    },
];

export const statusMesaCores = {
    [statusMesa.LIVRE]: {
        bg: "bg-green-500",
        text: "text-green-800",
        border: "border-green-300",
        light: "bg-green-100",
        dark: "bg-green-600",
        hex: "#10B981",
    },
    [statusMesa.OCUPADA]: {
        bg: "bg-red-500",
        text: "text-red-800",
        border: "border-red-300",
        light: "bg-red-100",
        dark: "bg-red-600",
        hex: "#EF4444",
    },
    [statusMesa.EM_FECHAMENTO]: {
        bg: "bg-yellow-500",
        text: "text-yellow-800",
        border: "border-yellow-300",
        light: "bg-yellow-100",
        dark: "bg-yellow-600",
        hex: "#F59E0B",
    },
    [statusMesa.AGUARDANDO_LIMPEZA]: {
        bg: "bg-blue-500",
        text: "text-blue-800",
        border: "border-blue-300",
        light: "bg-blue-100",
        dark: "bg-blue-600",
        hex: "#3B82F6",
    },
    [statusMesa.RESERVADA]: {
        bg: "bg-purple-500",
        text: "text-purple-800",
        border: "border-purple-300",
        light: "bg-purple-100",
        dark: "bg-purple-600",
        hex: "#8B5CF6",
    },
    [statusMesa.BLOQUEADA]: {
        bg: "bg-gray-500",
        text: "text-gray-800",
        border: "border-gray-300",
        light: "bg-gray-100",
        dark: "bg-gray-600",
        hex: "#6B7280",
    },
} as const;


// Labels para cada status
export const statusMesaLabels = {
    [statusMesa.LIVRE]: "Livre",
    [statusMesa.OCUPADA]: "Ocupada", 
    [statusMesa.EM_FECHAMENTO]: "Em Fechamento",
    [statusMesa.AGUARDANDO_LIMPEZA]: "Aguardando Limpeza",
    [statusMesa.RESERVADA]: "Reservada",
    [statusMesa.BLOQUEADA]: "Bloqueada"
} as const;

function getCorStatusMesa(status: StatusMesa) {
    return statusMesaCores[status];
}


function getLabelStatusMesa(status: StatusMesa) {
    return statusMesaLabels[status];
}

export default function Garcom() {
    const [mesa, setMesa] = useState<IMesa[]>(mockMesas);
    const [searchMesa, setSearchMesa] = useState<string>("");

    return (
        <div>
            {/* Header do Garcom */}
            <div className="flex flex-row space-x-2">
                {/* Barra de pesquia */}
                <Input
                    onChange={setSearchMesa}
                    iconLeft={Search}
                    placeholder="Pesquisar..."
                    value={searchMesa}
                    className=""
                />
                <CustomButton
                    label="Filtro"
                    onClick={() => console.log("buttão")}
                    iconLeft={
                        <Filter
                            strokeWidth={2}
                            size={20}
                            className="shrink-0"
                        />
                    }
                    className="hover:scale-105 transition-all duration-75 w-1/10"
                />
            </div>
            {/* Body do Garcom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                {mesa
                    .filter((mesa) =>
                        mesa.identificacao
                            .toLowerCase()
                            .includes(searchMesa.toLowerCase())
                    )
                    .map((mesa) => (
                        <Card
                            bgColor={getCorStatusMesa(mesa.status).bg}
                            className={`hover:scale-105 transition-all duration-75 w-full hover:opacity-80`}
                        >
                            <div className="flex flex-col">
                                <span className="truncate">
                                    {mesa.identificacao}
                                </span>
                                <span>{getLabelStatusMesa(mesa.status)}</span>
                                {mesa.status === statusMesa.OCUPADA ||
                                mesa.status === statusMesa.EM_FECHAMENTO ? (
                                    <>
                                        <span>{mesa.pessoas}</span>
                                        <span>
                                            {mesa.totalMesa?.toFixed(2)}
                                        </span>
                                        <span>
                                            {mesa.horaAbertura &&
                                                formatDate({
                                                    date: mesa.horaAbertura,
                                                    format: "relative"
                                                })}
                                        </span>
                                    </>
                                ) : null}
                            </div>
                        </Card>
                    ))}
            </div>
        </div>
    );
}
