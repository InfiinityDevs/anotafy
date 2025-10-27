import { useEffect, useRef, useState } from "react";
import Loading from "../../../components/Loading";
import MesaService from "../../../service/mesaService";
import { useNavigate } from "react-router-dom";
import { statusMesa, type StatusMesa } from "../../../types/enums/StatusMesa";
import { ChevronDownIcon } from "lucide-react";
import { DropDown } from "../../../components/DropDown";

interface IMesa {
    id: number;
    identificacao: string;
    status: StatusMesa;
    inicio?: Date;
}

const ParamsForStatus = {
    [statusMesa.LIVRE]: {
        border: "border-green-500",
        bg_status: "bg-green-100",
        text_status: "text-green-600",
        hover: "hover:bg-green-50",
        ring_color: "hover:ring-green-500",
        status: "LIVRE",
    },
    [statusMesa.OCUPADA]: {
        border: "border-red-500",
        bg_status: "bg-red-100",
        text_status: "text-red-600",
        hover: "hover:bg-red-50",
        ring_color: "hover:ring-red-500",
        status: "OCUPADA",
    },
    [statusMesa.EM_FECHAMENTO]: {
        border: "border-orange-500",
        bg_status: "bg-orange-100",
        text_status: "text-orange-600",
        hover: "hover:bg-orange-50",
        ring_color: "hover:ring-orange-500",
        status: "FECHAMENTO",
    },
    [statusMesa.AGUARDANDO_LIMPEZA]: {
        border: "border-yellow-500",
        bg_status: "bg-yellow-100",
        text_status: "text-yellow-600",
        hover: "hover:bg-yellow-50",
        ring_color: "hover:ring-yellow-500",
        status: "LIMPEZA",
    },
    [statusMesa.RESERVADA]: {
        border: "border-blue-500",
        bg_status: "bg-blue-100",
        text_status: "text-blue-600",
        hover: "hover:bg-blue-50",
        ring_color: "hover:ring-blue-500",
        status: "RESERVADA",
    },
    [statusMesa.BLOQUEADA]: {
        border: "border-gray-500",
        bg_status: "bg-gray-100",
        text_status: "text-gray-600",
        hover: "hover:bg-gray-50",
        ring_color: "hover:ring-gray-500",
        status: "BLOQUEADA",
    },
} as const;

const optionsFilter = [
    {
        value: "TODAS",
        label: "Todas",
    },
    {
        value: statusMesa.LIVRE,
        label: "Livres",
    },
    {
        value: statusMesa.OCUPADA,
        label: "Ocupadas",
    },
    {
        value: statusMesa.EM_FECHAMENTO,
        label: "Em Fechamento",
    },
    {
        value: statusMesa.AGUARDANDO_LIMPEZA,
        label: "Aguardando Limpeza",
    },
    {
        value: statusMesa.BLOQUEADA,
        label: "Bloqueadas",
    },
    {
        value: statusMesa.RESERVADA,
        label: "Revervadas",
    },
];

export default function Mesa() {
    const [loading, setLoading] = useState<boolean>(true);
    const [mesas, setMesas] = useState<IMesa[]>([]);
    const [filter, setFilter] = useState<StatusMesa | string>("TODAS");
    const [mesaSelected, setMesaSelected] = useState<number | null>(null);
    const mesaService = new MesaService();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchMesas = async () => {
            setLoading(true);
            try {
                const response = await mesaService.GetMesas();

                if (response.success) {
                    const mesasOrdenadas = response.data.sort(
                        (
                            a: { identificacao: string },
                            b: { identificacao: any }
                        ) => a.identificacao.localeCompare(b.identificacao)
                    );
                    setMesas(mesasOrdenadas);
                } else {
                    navigate("/error");
                }
            } catch (error) {
                console.error("Erro:", error);
                navigate("/error");
            } finally {
                setLoading(false);
            }
        };

        fetchMesas();
    }, []);

    if (loading) return <Loading />;

    return (
        <main className="flex w-full h-full p-6">
            <section className={ `flex flex-col ${mesaSelected ? "w-80" : "w-full"}` }>
                <div className="shrink-0 pb-4">
                    <label className="text-xl font-bold text-gray-800">
                        Mesas
                    </label>
                    {/* Filtro */}
                    <DropDown
                        options={optionsFilter}
                        onChange={(value) => setFilter(value)}
                        height="h-12"
                        width="w-full"
                    />
                </div>
                <div className="flex w-full overflow-hidden">
                    <div className="flex-1 flex flex-col gap-2.5 overflow-auto custom-scrollbar py-1 px-0.5">
                        {mesas.filter((mesa) => filter === "TODAS" || mesa.status === filter ).map((mesa) => (
                                <button
                                    className={`w-full max-h-16 min-h-16 bg-foreground rounded-md overflow-hidden flex items-center justify-between cursor-pointer
                                    ${
                                        ParamsForStatus[mesa.status].hover
                                    } hover:ring-2 ${
                                        ParamsForStatus[mesa.status].ring_color
                                    }`}
                                >
                                    <div
                                        className={`w-full h-full px-4 border-l-5 ${
                                            ParamsForStatus[mesa.status].border
                                        } text-black text-lg text-start flex flex-row justify-between items-center`}
                                    >
                                        <span className="font-semibold">
                                            {mesa.identificacao}
                                        </span>
                                        <span
                                            className={`text-sm font-medium py-0.5 px-1.5 rounded-sm ${
                                                ParamsForStatus[mesa.status]
                                                    .bg_status
                                            } ${
                                                ParamsForStatus[mesa.status]
                                                    .text_status
                                            }`}
                                        >
                                            {
                                                ParamsForStatus[mesa.status]
                                                    .status
                                            }
                                        </span>
                                    </div>
                                </button>
                            ))}{mesas.filter((mesa) => filter === "TODAS" || mesa.status === filter ).map((mesa) => (
                                <button
                                    className={`w-full max-h-16 min-h-16 bg-foreground rounded-md overflow-hidden flex items-center justify-between cursor-pointer
                                    ${
                                        ParamsForStatus[mesa.status].hover
                                    } hover:ring-2 ${
                                        ParamsForStatus[mesa.status].ring_color
                                    }`}
                                >
                                    <div
                                        className={`w-full h-full px-4 border-l-5 ${
                                            ParamsForStatus[mesa.status].border
                                        } text-black text-lg text-start flex flex-row justify-between items-center`}
                                    >
                                        <span className="font-semibold">
                                            {mesa.identificacao}
                                        </span>
                                        <span
                                            className={`text-sm font-medium py-0.5 px-1.5 rounded-sm ${
                                                ParamsForStatus[mesa.status]
                                                    .bg_status
                                            } ${
                                                ParamsForStatus[mesa.status]
                                                    .text_status
                                            }`}
                                        >
                                            {
                                                ParamsForStatus[mesa.status]
                                                    .status
                                            }
                                        </span>
                                    </div>
                                </button>
                            ))}
                    </div>
                </div>
            </section>
            <section>

            </section>
        </main>
    );
}
