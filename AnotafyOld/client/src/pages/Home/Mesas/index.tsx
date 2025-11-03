import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import MesaService from "../../../service/mesaService";
import { useNavigate } from "react-router-dom";
import { DropDown } from "../../../components/DropDown";
import { StatusMesa } from "../../../types/enums/StatusMesa";

interface IMesa {
    id: number;
    identificacao: string;
    status: StatusMesa;
    capacidade?: number;
    qtdPessoas?: number;
    inicio?: Date;
}

const ParamsForStatus = {
    [StatusMesa.LIVRE]: {
        border: "border-green-500",
        bg_status: "bg-green-100",
        text_status: "text-green-600",
        hover: "hover:bg-green-50",
        bg_light: "bg-green-50",
        ring_color: "hover:ring-green-500",
        ring: "ring-green-500",
        status: "LIVRE",
    },
    [StatusMesa.OCUPADA]: {
        border: "border-red-500",
        bg_status: "bg-red-100",
        text_status: "text-red-600",
        hover: "hover:bg-red-50",
        bg_light: "bg-red-50",
        ring_color: "hover:ring-red-500",
        ring: "ring-red-500",
        status: "OCUPADA",
    },
    [StatusMesa.EM_FECHAMENTO]: {
        border: "border-orange-500",
        bg_status: "bg-orange-100",
        text_status: "text-orange-600",
        hover: "hover:bg-orange-50",
        bg_light: "bg-orange-50",
        ring_color: "hover:ring-orange-500",
        ring: "ring-orange-500",
        status: "FECHAMENTO",
    },
    [StatusMesa.AGUARDANDO_LIMPEZA]: {
        border: "border-yellow-500",
        bg_status: "bg-yellow-100",
        text_status: "text-yellow-600",
        hover: "hover:bg-yellow-50",
        bg_light: "bg-yellow-50",
        ring_color: "hover:ring-yellow-500",
        ring: "ring-yellow-500",
        status: "LIMPEZA",
    },
    [StatusMesa.RESERVADA]: {
        border: "border-blue-500",
        bg_status: "bg-blue-100",
        text_status: "text-blue-600",
        hover: "hover:bg-blue-50",
        bg_light: "bg-blue-50",
        ring_color: "hover:ring-blue-500",
        ring: "ring-blue-500",
        status: "RESERVADA",
    },
    [StatusMesa.BLOQUEADA]: {
        border: "border-gray-500",
        bg_status: "bg-gray-100",
        text_status: "text-gray-600",
        hover: "hover:bg-gray-50",
        bg_light: "bg-gray-50",
        ring_color: "hover:ring-gray-500",
        ring: "ring-gray-500",
        status: "BLOQUEADA",
    },
} as const;

const optionsFilter = [
    {
        value: "TODAS",
        label: "Todas",
    },
    {
        value: StatusMesa.LIVRE,
        label: "Livres",
    },
    {
        value: StatusMesa.OCUPADA,
        label: "Ocupadas",
    },
    {
        value: StatusMesa.EM_FECHAMENTO,
        label: "Em Fechamento",
    },
    {
        value: StatusMesa.AGUARDANDO_LIMPEZA,
        label: "Aguardando Limpeza",
    },
    {
        value: StatusMesa.BLOQUEADA,
        label: "Bloqueadas",
    },
    {
        value: StatusMesa.RESERVADA,
        label: "Revervadas",
    },
];

function MesaActions({
    mesa,
    onClose,
}: {
    mesa: IMesa | null;
    onClose: () => void;
}) {
    if (!mesa) return null;

    const params = ParamsForStatus[mesa.status];

    const handleAction = (action: string) => {
        console.log(`Ação executada: ${action} na mesa ${mesa.identificacao}`);
        // Aqui você implementaria a lógica específica de cada ação
    };

    const renderByStatus = () => {
        switch (mesa.status) {
            case StatusMesa.LIVRE:
                return (
                    <div
                        className={`p-4 border-t-4 ${params.border} bg-white rounded-lg shadow-lg`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-lg">
                                    Mesa {mesa.identificacao}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Status:{" "}
                                    <span className={params.text_status}>
                                        {params.status}
                                    </span>
                                </p>
                                {mesa.capacidade && (
                                    <p className="text-sm text-gray-600">
                                        Capacidade: {mesa.capacidade} pessoas
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 text-lg"
                            >
                                ×
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleAction("abrir")}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex-1 min-w-[120px]"
                            >
                                Abrir Mesa
                            </button>
                            <button
                                onClick={() => handleAction("reservar")}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex-1 min-w-[120px]"
                            >
                                Reservar
                            </button>
                            <button
                                onClick={() => handleAction("bloquear")}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex-1 min-w-[120px]"
                            >
                                Bloquear
                            </button>
                        </div>
                    </div>
                );

            case StatusMesa.OCUPADA:
                const tempoOcupacao = mesa.inicio
                    ? Math.floor(
                          (new Date().getTime() -
                              new Date(mesa.inicio).getTime()) /
                              60000
                      )
                    : 0;

                return (
                    <div
                        className={`p-4 border-t-4 ${params.border} bg-white rounded-lg shadow-lg`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-lg">
                                    Mesa {mesa.identificacao}
                                </h3>
                                <div className="grid grid-cols-2 gap-x-4 text-sm text-gray-600">
                                    <span>Tempo: {tempoOcupacao}min</span>
                                    <span>
                                        Pessoas: {mesa.qtdPessoas || 0}/
                                        {mesa.capacidade || "?"}
                                    </span>
                                    <span>Valor: R$ --</span>
                                    <span>
                                        Status:{" "}
                                        <span className={params.text_status}>
                                            {params.status}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 text-lg"
                            >
                                ×
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() =>
                                    handleAction("adicionar_produto")
                                }
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded flex-1 min-w-[100px] text-sm"
                            >
                                + Produto
                            </button>
                            <button
                                onClick={() => handleAction("fechar")}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded flex-1 min-w-[100px] text-sm"
                            >
                                Fechar
                            </button>
                            <button
                                onClick={() => handleAction("transferir")}
                                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded flex-1 min-w-[100px] text-sm"
                            >
                                Transferir
                            </button>
                            <button
                                onClick={() => handleAction("detalhes")}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded flex-1 min-w-[100px] text-sm"
                            >
                                Detalhes
                            </button>
                        </div>
                    </div>
                );

            case StatusMesa.EM_FECHAMENTO:
                return (
                    <div
                        className={`p-4 border-t-4 ${params.border} bg-white rounded-lg shadow-lg`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-lg">
                                    Mesa {mesa.identificacao}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Status:{" "}
                                    <span className={params.text_status}>
                                        {params.status}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Total: R$ --
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 text-lg"
                            >
                                ×
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() =>
                                    handleAction("finalizar_pagamento")
                                }
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex-1 min-w-[140px]"
                            >
                                Finalizar Pagamento
                            </button>
                            <button
                                onClick={() => handleAction("reabrir")}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex-1 min-w-[140px]"
                            >
                                Reabrir Mesa
                            </button>
                            <button
                                onClick={() => handleAction("imprimir")}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex-1 min-w-[140px]"
                            >
                                Imprimir Comanda
                            </button>
                        </div>
                    </div>
                );

            case StatusMesa.AGUARDANDO_LIMPEZA:
                return (
                    <div
                        className={`p-4 border-t-4 ${params.border} bg-white rounded-lg shadow-lg`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-lg">
                                    Mesa {mesa.identificacao}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Status:{" "}
                                    <span className={params.text_status}>
                                        {params.status}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Aguardando limpeza
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 text-lg"
                            >
                                ×
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleAction("marcar_limpa")}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex-1 min-w-[140px]"
                            >
                                Marcar como Limpa
                            </button>
                            <button
                                onClick={() => handleAction("reabrir_urgente")}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex-1 min-w-[140px]"
                            >
                                Reabrir Urgente
                            </button>
                        </div>
                    </div>
                );

            case StatusMesa.RESERVADA:
                return (
                    <div
                        className={`p-4 border-t-4 ${params.border} bg-white rounded-lg shadow-lg`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-lg">
                                    Mesa {mesa.identificacao}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Status:{" "}
                                    <span className={params.text_status}>
                                        {params.status}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Cliente: --
                                </p>
                                <p className="text-sm text-gray-600">
                                    Horário: --
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 text-lg"
                            >
                                ×
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() =>
                                    handleAction("confirmar_reserva")
                                }
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex-1 min-w-[140px]"
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={() => handleAction("cancelar_reserva")}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex-1 min-w-[140px]"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleAction("editar_reserva")}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex-1 min-w-[140px]"
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                );

            case StatusMesa.BLOQUEADA:
                return (
                    <div
                        className={`p-4 border-t-4 ${params.border} bg-white rounded-lg shadow-lg`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-lg">
                                    Mesa {mesa.identificacao}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Status:{" "}
                                    <span className={params.text_status}>
                                        {params.status}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Motivo: --
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 text-lg"
                            >
                                ×
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleAction("desbloquear")}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex-1 min-w-[140px]"
                            >
                                Desbloquear
                            </button>
                            <button
                                onClick={() => handleAction("editar_motivo")}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex-1 min-w-[140px]"
                            >
                                Editar Motivo
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="w-full md:min-w-80 md:max-w-80">{renderByStatus()}</div>
    );
}

export default function Mesa() {
    const [loading, setLoading] = useState<boolean>(true);
    const [mesas, setMesas] = useState<IMesa[]>([]);
    const [filter, setFilter] = useState<StatusMesa | string>("TODAS");
    const [mesaSelected, setMesaSelected] = useState<number | null>(null);
    const mesaService = new MesaService();
    const navigate = useNavigate();

    const handleMesaSelect = (mesaId: number) => {
        if (mesaSelected === mesaId) {
            setMesaSelected(null);
            return;
        }
        setMesaSelected(mesaId);
    };

    const mesaAtual = mesas.find((mesa) => mesa.id === mesaSelected) || null;

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
        <main
            className={`flex flex-col md:flex-row w-full h-full md:p-6 justify-between ${
                mesaSelected && "pb-0 md:pb-6"
            }`}
        >
            <section
                className={`flex flex-col min-h-0 w-full p-4 md:p-0 ${
                    mesaSelected ? "pb-1 md:p-0 md:w-80" : "md:w-full"
                }`}
            >
                <div className="pb-4">
                    <label className="text-xl font-bold text-gray-800">
                        Mesas
                    </label>
                    <DropDown
                        options={optionsFilter}
                        onChange={(value) => setFilter(value)}
                        height="h-12"
                        width="w-full"
                    />
                </div>
                <div className="flex w-full overflow-hidden">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 overflow-auto custom-scrollbar py-1 px-1.5 ">
                        {mesas
                            .filter(
                                (mesa) =>
                                    filter === "TODAS" || mesa.status === filter
                            )
                            .map((mesa) => (
                                <button
                                    key={mesa.id}
                                    onClick={() => handleMesaSelect(mesa.id)}
                                    className={`w-full max-h-16 min-h-16 bg-foreground rounded-md overflow-hidden flex items-center justify-between cursor-pointer
                                    ${
                                        mesaSelected === mesa.id &&
                                        `ring-2 ${
                                            ParamsForStatus[mesa.status]
                                                .bg_light
                                        } ${ParamsForStatus[mesa.status].ring}`
                                    }
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

            {/* Seção de Ações da Mesa */}
            <section
                className={`${mesaSelected ? "block" : "hidden"} md:block`}
            >
                <MesaActions
                    mesa={mesaAtual}
                    onClose={() => setMesaSelected(null)}
                />
            </section>
        </main>
    );
}
