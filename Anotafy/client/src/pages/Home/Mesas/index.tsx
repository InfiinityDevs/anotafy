import { useState } from "react";
import { statusMesa, type StatusMesa } from "../../../types/enums/StatusMesa";
import Input from "../../../components/Input";
import { Filter, Search } from "lucide-react";
import CustomButton from "../../../components/CustomButton";
import Card from "../../../components/Card";
import { formatDate } from "../../../utils/formatDate";
import {
    RockingChair,
    Users,
    Receipt,
    Sparkles,
    Clock,
    Lock,
} from "lucide-react";

interface IMesa {
    id: number;
    identificacao: string;
    status: StatusMesa;
    capacidade?: number;
    pessoas?: number;
    horaAbertura?: Date;
    totalMesa?: number;
}

const mockMesas: IMesa[] = [
    {
        id: 1,
        identificacao: "Mesa 01",
        status: statusMesa.LIVRE,
        capacidade: 4,
        pessoas: undefined,
        horaAbertura: undefined,
        totalMesa: 0,
    },
    {
        id: 2,
        identificacao: "Mesa 02",
        status: statusMesa.OCUPADA,
        capacidade: 6,
        pessoas: 4,
        horaAbertura: new Date("2024-01-20 19:30:00"),
        totalMesa: 152.5,
    },
    {
        id: 3,
        identificacao: "Mesa 03",
        status: statusMesa.OCUPADA,
        capacidade: 4,
        pessoas: 2,
        horaAbertura: new Date("2024-01-20T20:15:00"),
        totalMesa: 87.9,
    },
    {
        id: 4,
        identificacao: "Mesa 04",
        status: statusMesa.EM_FECHAMENTO,
        capacidade: 8,
        pessoas: 3,
        horaAbertura: new Date("2024-01-20T18:45:00"),
        totalMesa: 234.75,
    },
    {
        id: 5,
        identificacao: "Mesa 05",
        status: statusMesa.AGUARDANDO_LIMPEZA,
        capacidade: 4,
        pessoas: undefined,
        horaAbertura: undefined,
        totalMesa: 0,
    },
    {
        id: 6,
        identificacao: "Mesa 06",
        status: statusMesa.RESERVADA,
        capacidade: 10,
        pessoas: undefined,
        horaAbertura: new Date("2024-01-20T21:00:00"),
        totalMesa: 0,
    },
    {
        id: 7,
        identificacao: "Mesa 07",
        status: statusMesa.BLOQUEADA,
        capacidade: 4,
        pessoas: undefined,
        horaAbertura: undefined,
        totalMesa: 0,
    },
    {
        id: 8,
        identificacao: "Mesa 08",
        status: statusMesa.LIVRE,
        capacidade: 6,
        pessoas: undefined,
        horaAbertura: undefined,
        totalMesa: 0,
    },
    {
        id: 9,
        identificacao: "Mesa VI",
        status: statusMesa.OCUPADA,
        capacidade: 12,
        pessoas: 6,
        horaAbertura: new Date("2024-01-20T19:00:00"),
        totalMesa: 589.3,
    },
    {
        id: 10,
        identificacao: "Mesa VI",
        status: statusMesa.LIVRE,
        capacidade: 8,
        pessoas: undefined,
        horaAbertura: undefined,
        totalMesa: 0,
    },
    {
        id: 11,
        identificacao: "Mesa 09",
        status: statusMesa.OCUPADA,
        capacidade: 2,
        pessoas: 1,
        horaAbertura: new Date("2024-01-20T20:30:00"),
        totalMesa: 45.2,
    },
    {
        id: 12,
        identificacao: "Mesa 10",
        status: statusMesa.LIVRE,
        capacidade: 4,
        pessoas: undefined,
        horaAbertura: undefined,
        totalMesa: 0,
    },
    {
        id: 13,
        identificacao: "Mesa 11",
        status: statusMesa.OCUPADA,
        capacidade: 6,
        pessoas: 5,
        horaAbertura: new Date("2025-10-22T19:30:00"),
        totalMesa: 198.6,
    },
    {
        id: 14,
        identificacao: "Mesa 12",
        status: statusMesa.LIVRE,
        capacidade: 4,
        pessoas: undefined,
        horaAbertura: undefined,
        totalMesa: 0,
    },
    {
        id: 15,
        identificacao: "Mesa 13",
        status: statusMesa.RESERVADA,
        capacidade: 8,
        pessoas: undefined,
        horaAbertura: new Date("2025-10-22T19:30:00"),
        totalMesa: 0,
    },
];

export const statusMesaCores = {
    [statusMesa.LIVRE]: {
        bg: "bg-green-200",
        text: "text-green-900",
        border: "border-green-400",
        light: "bg-green-100",
        dark: "bg-green-600",
        hex: "#10B981",
    },
    [statusMesa.OCUPADA]: {
        bg: "bg-red-200",
        text: "text-red-900",
        border: "border-red-400",
        light: "bg-red-100",
        dark: "bg-red-600",
        hex: "#EF4444",
    },
    [statusMesa.EM_FECHAMENTO]: {
        bg: "bg-yellow-200",
        text: "text-yellow-900",
        border: "border-yellow-400",
        light: "bg-yellow-100",
        dark: "bg-yellow-600",
        hex: "#F59E0B",
    },
    [statusMesa.AGUARDANDO_LIMPEZA]: {
        bg: "bg-blue-200",
        text: "text-blue-900",
        border: "border-blue-400",
        light: "bg-blue-100",
        dark: "bg-blue-600",
        hex: "#3B82F6",
    },
    [statusMesa.RESERVADA]: {
        bg: "bg-purple-200",
        text: "text-purple-900",
        border: "border-purple-400",
        light: "bg-purple-100",
        dark: "bg-purple-600",
        hex: "#8B5CF6",
    },
    [statusMesa.BLOQUEADA]: {
        bg: "bg-gray-200",
        text: "text-gray-900",
        border: "border-gray-400",
        light: "bg-gray-100",
        dark: "bg-gray-600",
        hex: "#6B7280",
    },
} as const;

const iconesStatusMesa = {
    [statusMesa.LIVRE]: RockingChair,
    [statusMesa.OCUPADA]: Users,
    [statusMesa.EM_FECHAMENTO]: Receipt,
    [statusMesa.AGUARDANDO_LIMPEZA]: Sparkles,
    [statusMesa.RESERVADA]: Clock,
    [statusMesa.BLOQUEADA]: Lock,
} as const;

export const statusMesaLabels = {
    [statusMesa.LIVRE]: "Livre",
    [statusMesa.OCUPADA]: "Ocupada",
    [statusMesa.EM_FECHAMENTO]: "Em Fechamento",
    [statusMesa.AGUARDANDO_LIMPEZA]: "Aguardando Limpeza",
    [statusMesa.RESERVADA]: "Reservada",
    [statusMesa.BLOQUEADA]: "Bloqueada",
} as const;

function getCorStatusMesa(status: StatusMesa) {
    return statusMesaCores[status];
}

function getLabelStatusMesa(status: StatusMesa) {
    return statusMesaLabels[status];
}

export default function Mesa() {
    const [mesa, setMesa] = useState<IMesa[]>(mockMesas);
    const [searchMesa, setSearchMesa] = useState<string>("");

    return (
        <div className="h-full">
            
        </div>
    );
}
