import { useState } from "react";
import { StatusEmpresa } from "../../../types/enums/StatusEmpresa";
import { StatusUnidade } from "../../../types/enums/StatusUnidade";
import { TipoUnidade } from "../../../types/enums/TipoUnidade";
import Logo from "../../../components/Logo";
import Stepper from "../../../components/Stepper";
import Input from "../../../components/Input";
import CustomButton from "../../../components/CustomButton";
import FormatDateForInput from "../../../utils/FormatDateForInput";
import type { IAlert } from "../../../components/Alert";
import Alert from "../../../components/Alert";
import { DropDown } from "../../../components/DropDown";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import Modal from "../../../components/Modal";
import StringUtils from "../../../utils/StringUtils";

interface IRegisterEmpresa {
    razao_social: string;
    nome_fantasia: string;
    cnpj_raiz: string;
    data_fundacao: string;
    cnae_principal: string;
    telefone_principal: string;
    email_principal: string;
    website: string;
    logo_url: string;
    status: StatusEmpresa;
    data_cadastro: Date;
    data_atualizacao: Date;
}

interface IRegisterUnidade {
    id?: number;
    matriz_id?: number;
    nome: string;
    tipo_unidade: TipoUnidade;
    cnpj: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    codigo_ibge_municipio: string;
    telefone: string;
    email: string;
    status: StatusUnidade;
    data_abertura: Date;
    data_cadastro?: Date;
    data_atualizacao?: Date;
}

interface IRegisterUsuario {
    nome: string;
    codigo_identificacao: string;
    login: string;
    senha: string;
}

interface IRegisterMesa {
    id: number | null;
    identificacao: string;
    capacidade: number;
}

interface TitlePage {
    [key: number]: {
        title: string;
    };
}

type InputType =
    | "number"
    | "date"
    | "text"
    | "tel"
    | "email"
    | "url"
    | "password"
    | "select";

interface CampoConfig {
    name: string; // Mudamos para string para ser mais flexível
    label: string;
    type: InputType;
    required?: boolean;
    inputMode?: "tel" | "email" | "url" | "text";
    max?: string;
    borderFocus?: string;
    options?: { value: string; label: string }[];
}

const OpcaoTiposUnidade = [
    { value: "", label: "Selecione o tipo da unidade..." },
    { value: TipoUnidade.MATRIZ, label: "Matriz" },
    { value: TipoUnidade.FILIAL, label: "Filial" },
    { value: TipoUnidade.ESCRITORIO, label: "Escritório" },
    { value: TipoUnidade.DEPOSITO, label: "Depósito" },
];

const CamposPorEtapa: Record<number, CampoConfig[]> = {
    1: [
        {
            name: "razao_social",
            label: "Razão Social",
            type: "text",
            required: true,
        },
        {
            name: "nome_fantasia",
            label: "Nome Fantasia",
            type: "text",
            required: true,
        },
        {
            name: "cnpj_raiz",
            label: "CNPJ Raiz",
            type: "text",
            required: true,
            inputMode: "tel",
            max: "14",
        },
        { name: "data_fundacao", label: "Data Fundação", type: "date" },
        { name: "cnae_principal", label: "CNAE Principal", type: "text" },
        {
            name: "telefone_principal",
            label: "Telefone Principal",
            type: "tel",
            required: true,
        },
        {
            name: "email_principal",
            label: "Email Principal",
            type: "email",
            required: true,
        },
        { name: "website", label: "Website", type: "url" },
    ],
    2: [
        { name: "nome", label: "Nome", type: "text", required: true },
        {
            name: "tipo_unidade",
            label: "Tipo Unidade",
            type: "select", // Mudado para "select"
            required: true,
            options: OpcaoTiposUnidade,
        },
        {
            name: "cnpj",
            label: "CNPJ",
            type: "text",
            required: true,
            inputMode: "tel",
            max: "14",
        },
        {
            name: "cep",
            label: "CEP",
            type: "text",
            inputMode: "tel",
            max: "8",
        },
        { name: "logradouro", label: "Logradouro", type: "text" },
        { name: "numero", label: "Número", type: "text" },
        { name: "complemento", label: "Complemento", type: "text" },
        { name: "bairro", label: "Bairro", type: "text" },
        { name: "cidade", label: "Cidade", type: "text" },
        { name: "estado", label: "Estado", type: "text" },
        { name: "codigo_ibge_municipio", label: "Código IBGE", type: "text" },
        { name: "telefone", label: "Telefone", type: "tel", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "data_abertura", label: "Data Abertura", type: "date" },
    ],
    3: [
        { name: "nome", label: "Nome", type: "text", required: true },
        {
            name: "codigo_identificacao",
            label: "Código Identificação",
            type: "text",
            required: true,
        },
        { name: "login", label: "Login", type: "text", required: true },
        { name: "senha", label: "Senha", type: "password", required: true },
    ],
};

const INIT_EMPRESA: IRegisterEmpresa = {
    razao_social: "",
    nome_fantasia: "",
    cnpj_raiz: "",
    data_fundacao: "",
    cnae_principal: "",
    telefone_principal: "",
    email_principal: "",
    website: "",
    logo_url: "",
    status: StatusEmpresa.ATIVA,
    data_cadastro: new Date(),
    data_atualizacao: new Date(),
};

const INIT_UNIDADE: IRegisterUnidade = {
    nome: "",
    tipo_unidade: TipoUnidade.FILIAL,
    cnpj: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    codigo_ibge_municipio: "",
    telefone: "",
    email: "",
    status: StatusUnidade.ATIVA,
    data_abertura: new Date(),
    data_cadastro: new Date(),
    data_atualizacao: new Date(),
};

const INIT_USUARIO: IRegisterUsuario = {
    nome: "",
    codigo_identificacao: "",
    login: "",
    senha: "",
};

const ALERTA: IAlert = {
    title: "",
    message: "",
    open: false,
    type: "error",
};

const TITULO_PAGINA: TitlePage = {
    1: {
        title: "Cadastrar da Empresa",
    },
    2: {
        title: "Cadastrar da Unidade",
    },
    3: {
        title: "Cadastrar do Usuário",
    },
    4: {
        title: "Cadastrar Mesas",
    },
    5: {
        title: "Confirmar Cadastro",
    },
};

export default function Registro() {
    const [registerLevel, setRegisterLevel] = useState<number>(1);
    const [open, setOpen] = useState<boolean>(true);
    const [empresa, setEmpresa] = useState<IRegisterEmpresa>(INIT_EMPRESA);
    const [unidade, setUnidade] = useState<IRegisterUnidade>(INIT_UNIDADE);
    const [usuario, setUsuario] = useState<IRegisterUsuario>(INIT_USUARIO);
    const [mesas, setMesas] = useState<IRegisterMesa[]>([]);
    const [newMesa, setNewMesa] = useState<IRegisterMesa>({ id: null, identificacao: "", capacidade: 0 });
    const [erro, setErro] = useState<boolean>(false);
    const [alert, setAlert] = useState<IAlert>(ALERTA);

    const ProximoParte = () => {
        console.log(registerLevel);
        if (registerLevel === 1) {
            const camposObrigatorios = CamposPorEtapa[registerLevel].filter(
                (campo) => campo.required
            );
            const temErro = camposObrigatorios.some(
                (campo) =>
                    !empresa[campo.name as keyof IRegisterEmpresa] ||
                    empresa[campo.name as keyof IRegisterEmpresa]
                        ?.toString()
                        .trim() === ""
            );

            if (temErro) {
                setAlert({
                    ...alert,
                    title: "Erro",
                    message: "Preencha todos os campos obrigatórios",
                    open: true,
                    type: "error",
                });
                setErro(true);
                return;
            }
        } else if (registerLevel === 2) {
            const camposObrigatorios = CamposPorEtapa[registerLevel].filter(
                (campo) => campo.required
            );
            const temErro = camposObrigatorios.some(
                (campo) =>
                    !unidade[campo.name as keyof IRegisterUnidade] ||
                    unidade[campo.name as keyof IRegisterUnidade]
                        ?.toString()
                        .trim() === ""
            );

            if (temErro) {
                setAlert({
                    ...alert,
                    title: "Erro",
                    message: "Preencha todos os campos obrigatórios da unidade",
                    open: true,
                    type: "error",
                });
                setErro(true);
                return;
            }
        } else if (registerLevel === 3) {
            const camposObrigatorios = CamposPorEtapa[registerLevel].filter(
                (campo) => campo.required
            );
            const temErro = camposObrigatorios.some(
                (campo) =>
                    !usuario[campo.name as keyof IRegisterUsuario] ||
                    usuario[campo.name as keyof IRegisterUsuario]
                        ?.toString()
                        .trim() === ""
            );

            if (temErro) {
                setAlert({
                    ...alert,
                    title: "Erro",
                    message: "Preencha todos os campos obrigatórios da unidade",
                    open: true,
                    type: "error",
                });
                setErro(true);
                return;
            }
        }
        setErro(false);

        if (registerLevel === 5) {
                

            return
        };
        setRegisterLevel((prev) => prev + 1);
    };

    const ParteAnterior = () => {
        setRegisterLevel((prev) => prev - 1);
    };

    const validarCampoCapacidade = (value: string) => {
        let capacidade = newMesa.capacidade;

        if (StringUtils.temApenasNumeros(value)) capacidade = Number(value);

        setNewMesa({
            ...newMesa,
            capacidade: capacidade,
        });
    };

    const RemoverMesa = (id: number) => {
        setMesas(mesas.filter((_, i) => i !== id));
    };

    const EditarMesa = (id: number) => {
        setNewMesa({
            id: id,
            identificacao: mesas[id].identificacao,
            capacidade: mesas[id].capacidade,
        });
        setOpen(!open);
    };

    const AddMesa = ({ continuar = false }: { continuar?: boolean | undefined }) => {
        if (newMesa.identificacao === "") {
            setAlert({
                ...alert,
                title: "Erro",
                message: "Preencha todos os campos obrigatórios",
                open: true,
                type: "error",
            });
            return;
        }

        if (newMesa.id !== undefined && newMesa.id !== null) {
            setMesas((prev) => {
                prev[newMesa.id as number] = newMesa;
                return prev;
            });
            setAlert({
                ...alert,
                title: "Sucesso",
                message: "Mesa atualizada com sucesso!",
                open: true,
                type: "success",
            });
            if (continuar !== true) {
                setTimeout(() => {
                    setOpen(!open);
                }, 500);
            }
            setNewMesa({id: null, identificacao: "", capacidade: 0 });
            return;
        }
        setAlert({
            ...alert,
            title: "Sucesso",
            message: "Mesa adicionada com sucesso!",
            open: true,
            type: "success",
        });
        setMesas((prev) => [...prev, newMesa]);
        setNewMesa({ id: null, identificacao: "", capacidade: 0 });
        if (continuar !== true) {
            setTimeout(() => {
                setOpen(!open);
            }, 500);
        }
    };

    const RenderConteudoRegistro = (level: number): React.ReactNode => {
        const campos = CamposPorEtapa[level];

        if (level === 1) {
            return (
                <>
                    {campos.map((campo) => (
                        <Input
                            key={campo.name}
                            type={campo.type as Exclude<InputType, "select">}
                            value={
                                campo.type === "date"
                                    ? FormatDateForInput(
                                          empresa[
                                              campo.name as keyof IRegisterEmpresa
                                          ] as string
                                      )
                                    : empresa[
                                          campo.name as keyof IRegisterEmpresa
                                      ]?.toString() || ""
                            }
                            onChange={(value) =>
                                setEmpresa((prev) => ({
                                    ...prev,
                                    [campo.name]: value,
                                }))
                            }
                            placeholder={campo.label}
                            label={campo.label}
                            required={campo.required}
                            inputMode={campo.inputMode}
                            max={campo.max}
                            border={
                                erro &&
                                (!empresa[
                                    campo.name as keyof IRegisterEmpresa
                                ] ||
                                    empresa[
                                        campo.name as keyof IRegisterEmpresa
                                    ]
                                        ?.toString()
                                        .trim() === "") &&
                                campo.required
                                    ? "red-500 focus-within:border-red-500 focus-within:ring-red-500"
                                    : undefined
                            }
                            classDivIn={
                                erro &&
                                (!empresa[
                                    campo.name as keyof IRegisterEmpresa
                                ] ||
                                    empresa[
                                        campo.name as keyof IRegisterEmpresa
                                    ]
                                        ?.toString()
                                        .trim() === "") &&
                                campo.required
                                    ? "ring-1 ring-red-500"
                                    : undefined
                            }
                        />
                    ))}
                </>
            );
        } else if (level === 2) {
            return (
                <>
                    {campos.map((campo) => {
                        if (campo.type === "select" && campo.options) {
                            return (
                                <div className=" flex flex-col mt-2">
                                    <label className="block text-md font-medium text-gray-700">
                                        {campo.label}
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>
                                    <DropDown
                                        options={campo.options}
                                        height="h-13"
                                        width="w-full"
                                        value={unidade.tipo_unidade}
                                        onChange={(value) => {
                                            setUnidade((prev) => ({
                                                ...prev,
                                                [campo.name]: value,
                                            }));
                                        }}
                                        buttonClassName={
                                            erro &&
                                            (!unidade[
                                                campo.name as keyof IRegisterUnidade
                                            ] ||
                                                unidade[
                                                    campo.name as keyof IRegisterUnidade
                                                ]
                                                    ?.toString()
                                                    .trim() === "") &&
                                            campo.required
                                                ? "ring-1 ring-red-500 border-red-500 focus:ring-3 focus:ring-red-500 focus:border-red-500"
                                                : "bg-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500"
                                        }
                                    />
                                </div>
                            );
                        }

                        return (
                            <Input
                                key={campo.name}
                                type={
                                    campo.type as Exclude<InputType, "select">
                                }
                                value={
                                    campo.type === "date"
                                        ? FormatDateForInput(
                                              unidade[
                                                  campo.name as keyof IRegisterUnidade
                                              ] as string
                                          )
                                        : unidade[
                                              campo.name as keyof IRegisterUnidade
                                          ]?.toString() || ""
                                }
                                onChange={(value) =>
                                    setUnidade((prev) => ({
                                        ...prev,
                                        [campo.name]: value,
                                    }))
                                }
                                placeholder={campo.label}
                                label={campo.label}
                                required={campo.required}
                                inputMode={campo.inputMode}
                                max={campo.max}
                                border={
                                    erro &&
                                    (!unidade[
                                        campo.name as keyof IRegisterUnidade
                                    ] ||
                                        unidade[
                                            campo.name as keyof IRegisterUnidade
                                        ]
                                            ?.toString()
                                            .trim() === "") &&
                                    campo.required
                                        ? "red-500 focus-within:border-red-500 focus-within:ring-red-500"
                                        : undefined
                                }
                                classDivIn={
                                    erro &&
                                    (!unidade[
                                        campo.name as keyof IRegisterUnidade
                                    ] ||
                                        unidade[
                                            campo.name as keyof IRegisterUnidade
                                        ]
                                            ?.toString()
                                            .trim() === "") &&
                                    campo.required
                                        ? "ring-1 ring-red-500"
                                        : undefined
                                }
                            />
                        );
                    })}
                </>
            );
        } else if (level === 3) {
            return (
                <>
                    {campos.map((campo) => (
                        <Input
                            key={campo.name}
                            type={campo.type as Exclude<InputType, "select">}
                            value={
                                campo.type === "date"
                                    ? FormatDateForInput(
                                          usuario[
                                              campo.name as keyof IRegisterUsuario
                                          ] as string
                                      )
                                    : usuario[
                                          campo.name as keyof IRegisterUsuario
                                      ]?.toString() || ""
                            }
                            onChange={(value) =>
                                setUsuario((prev) => ({
                                    ...prev,
                                    [campo.name]: value,
                                }))
                            }
                            placeholder={campo.label}
                            label={campo.label}
                            required={campo.required}
                            inputMode={campo.inputMode}
                            max={campo.max}
                            border={
                                erro &&
                                (!usuario[
                                    campo.name as keyof IRegisterUsuario
                                ] ||
                                    usuario[
                                        campo.name as keyof IRegisterUsuario
                                    ]
                                        ?.toString()
                                        .trim() === "") &&
                                campo.required
                                    ? "red-500 focus-within:border-red-500 focus-within:ring-red-500"
                                    : undefined
                            }
                            classDivIn={
                                erro &&
                                (!usuario[
                                    campo.name as keyof IRegisterUsuario
                                ] ||
                                    usuario[
                                        campo.name as keyof IRegisterUsuario
                                    ]
                                        ?.toString()
                                        .trim() === "") &&
                                campo.required
                                    ? "ring-1 ring-red-500"
                                    : undefined
                            }
                        />
                    ))}
                </>
            );
        } else if (level === 4) {
            return (
                <div className="relative w-full h-full">
                    <Modal open={open}>
                        <div className="relative flex flex-col gap-3 w-4/5 lg:w-2/4 2xl:w-1/3   h-auto p-4 py-6 bg-foreground rounded-lg shadow-2xl">
                            <button
                                className="absolute right-2 top-2 text-gray-500"
                                onClick={() => setOpen(!open)}
                            >
                                <X />
                            </button>
                            <Input
                                type="text"
                                placeholder="Identificação"
                                label="Identificação"
                                required={true}
                                value={newMesa.identificacao}
                                onChange={(value) => {
                                    setNewMesa({
                                        ...newMesa,
                                        identificacao: value,
                                    });
                                }}
                            />
                            <Input
                                type="tel"
                                placeholder="Capacidade"
                                label="Capacidade"
                                value={newMesa.capacidade}
                                onChange={(value) =>
                                    validarCampoCapacidade(value)
                                }
                            />
                            <CustomButton
                                onClick={() => AddMesa({})}
                                label={
                                    newMesa.id === null
                                        ? "Adicionar Mesa"
                                        : "Editar Mesa"
                                }
                                sizeLabel="md"
                                className="font-semibold mt-5"
                                iconLeft={<Plus strokeWidth={2.5} />}
                            />
                            <CustomButton
                                onClick={() => AddMesa({ continuar: true })}
                                label={"Salvar e Adicionar Mesa!"}
                                sizeLabel="md"
                                className={`font-semibold mt-5 ${
                                    newMesa.id !== null && "hidden"
                                }`}
                                iconLeft={<Plus strokeWidth={2.5} />}
                            />
                        </div>
                    </Modal>

                    <div className="w-full flex flex-row justify-between items-center">
                        <span className="text-xl font-bold">Mesas</span>
                        <button
                            onClick={() => {
                                setNewMesa({
                                    id: null,
                                    identificacao: "",
                                    capacidade: 0,
                                });
                                setOpen(!open);
                            }}
                            className="bg-primary p-2 w-min aspect-square rounded-full text-white"
                        >
                            <Plus strokeWidth={4} />
                        </button>
                    </div>
                    <div className="flex w-full h-full overflow-hidden py-2.5">
                        <div className="flex flex-col w-full min-h-0 overflow-auto">
                            {mesas.map((mesa, index) => {
                                return (
                                    <div className="flex flex-row justify-between items-center border-y border-gray-200 p-2 px-4 gap-2">
                                        <span className="text-lg font-medium truncate w-full">
                                            {mesa.identificacao}
                                        </span>
                                        <div className="flex flex-row gap-3 w-min h-full">
                                            <button
                                                onClick={() =>
                                                    EditarMesa(index)
                                                }
                                                className="flex items-center justify-center bg-yellow-100 text-yellow-500 border-yellow-500 border-2 w-min aspect-square rounded-xl p-1"
                                            >
                                                <Pencil
                                                    strokeWidth={2}
                                                    size={25}
                                                />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    RemoverMesa(index)
                                                }
                                                className="flex items-center justify-center bg-red-100 text-red-500 border-red-500 border-2 w-min aspect-square rounded-xl p-1"
                                            >
                                                <Trash2
                                                    strokeWidth={2}
                                                    size={25}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
            // ... código anterior mantido ...
        } else if (level === 5) {
            return (
                <div className="flex flex-col w-full h-full overflow-auto custom-scrollbar">
                    {/* Resumo da Empresa */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3 text-gray-700 border-b border-gray-300 pb-2">
                            Empresa
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-lg font-semibold text-gray-600">
                                    Razão Social
                                </label>
                                <p className="text-gray-500">
                                    {empresa.razao_social || "Não informado"}
                                </p>
                            </div>
                            <div>
                                <label className="text-lg font-semibold text-gray-600">
                                    Nome Fantasia
                                </label>
                                <p className="text-gray-500">
                                    {empresa.nome_fantasia || "Não informado"}
                                </p>
                            </div>
                            <div>
                                <label className="text-lg font-semibold text-gray-600">
                                    CNPJ Raiz
                                </label>
                                <p className="text-gray-500">
                                    {empresa.cnpj_raiz || "Não informado"}
                                </p>
                            </div>
                            <div>
                                <label className="text-lg font-semibold text-gray-600">
                                    Data Fundação
                                </label>
                                <p className="text-gray-500">
                                    {empresa.data_fundacao
                                        ? FormatDateForInput(
                                              empresa.data_fundacao
                                          )
                                        : "Não informado"}
                                </p>
                            </div>
                            <div>
                                <label className="text-lg font-semibold text-gray-600">
                                    Telefone
                                </label>
                                <p className="text-gray-500">
                                    {empresa.telefone_principal ||
                                        "Não informado"}
                                </p>
                            </div>
                            <div>
                                <label className="text-lg font-semibold text-gray-600">
                                    Email
                                </label>
                                <p className="text-gray-500">
                                    {empresa.email_principal || "Não informado"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Resumo da Unidade */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3 text-gray-700 border-b border-gray-300 pb-2">
                            Unidade
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-lg font-semibold text-gray-600">
                                    Nome
                                </label>
                                <p className="text-gray-500">
                                    {unidade.nome || "Não informado"}
                                </p>
                            </div>
                            <div>
                                <label className="text-lg font-semibold text-gray-600">
                                    Tipo
                                </label>
                                <p className="text-gray-500">
                                    {OpcaoTiposUnidade.find(
                                        (opt) =>
                                            opt.value === unidade.tipo_unidade
                                    )?.label || "Não informado"}
                                </p>
                            </div>
                            <div>
                                <label className="text-lg font-semibold text-gray-600">
                                    CNPJ
                                </label>
                                <p className="text-gray-500">
                                    {unidade.cnpj || "Não informado"}
                                </p>
                            </div>
                            <div>
                                <label className="text-lg font-semibold text-gray-600">
                                    Telefone
                                </label>
                                <p className="text-gray-500">
                                    {unidade.telefone || "Não informado"}
                                </p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-lg font-semibold text-gray-600">
                                    Endereço
                                </label>
                                <p className="text-gray-500">
                                    {[
                                        unidade.logradouro,
                                        unidade.numero,
                                        unidade.complemento,
                                        unidade.bairro,
                                        unidade.cidade,
                                        unidade.estado,
                                    ]
                                        .filter(Boolean)
                                        .join(", ") || "Não informado"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Resumo do Usuário */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3 text-gray-700 border-b border-gray-300 pb-2">
                            Usuário Administrador
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-lg font-semibold text-gray-600">
                                    Nome
                                </label>
                                <p className="text-gray-500">
                                    {usuario.nome || "Não informado"}
                                </p>
                            </div>
                            <div>
                                <label className="text-lg font-semibold text-gray-600">
                                    Código Identificação
                                </label>
                                <p className="text-gray-500">
                                    {usuario.codigo_identificacao ||
                                        "Não informado"}
                                </p>
                            </div>
                            <div>
                                <label className="text-lg font-semibold text-gray-600">
                                    Login
                                </label>
                                <p className="text-gray-500">
                                    {usuario.login || "Não informado"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Resumo das Mesas */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3 text-gray-700 border-b border-gray-300 pb-2">
                            Mesas ({mesas.length})
                        </h3>
                        {mesas.length > 0 ? (
                            <div className="space-y-2">
                                {mesas.map((mesa, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded"
                                    >
                                        <span className="font-medium">
                                            {mesa.identificacao}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            Capacidade: {mesa.capacidade}{" "}
                                            pessoas
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">
                                Nenhuma mesa cadastrada
                            </p>
                        )}
                    </div>

                    {/* Aviso de Confirmação */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                        <div className="flex items-start">
                            <div className="shrink-0">
                                <svg
                                    className="h-5 w-5 text-blue-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800">
                                    Confirmação Final
                                </h3>
                                <div className="mt-2 text-sm text-blue-700">
                                    <p>
                                        Verifique todas as informações acima.
                                        Após confirmar, o cadastro será
                                        processado e não poderá ser alterado.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // ... resto do código mantido ...
        return null;
    };

    return (
        <div className="flex flex-col gap-3 justify-center items-center w-full my-h-screen bg-backgound">
            <Alert
                message={alert.message}
                open={alert.open}
                onClose={() => setAlert({ ...alert, open: false })}
                type={alert.type}
                title={alert.title}
            />
            <div className="top-15 right-0 left-0 w-full justify-center flex items-center gap-2">
                <Logo className="w-10" />
                <h1 className="font-black text-xl select-none">ANOTAFY</h1>
            </div>
            <div className="flex flex-col bg-foreground py-6 w-5/6 md:w-4/5 h-4/5 rounded-lg p-4 shadow-lg ">
                <Stepper currentStep={registerLevel} totalSteps={5} />
                <div className="flex flex-col w-full overflow-hidden h-full">
                    <span className="py-4 text-xl font-bold w-full">
                        {TITULO_PAGINA[registerLevel].title}
                    </span>
                    <div className="flex flex-col w-full overflow-hidden h-full">
                        {registerLevel < 4 ? (
                            <div className="flex-1 grid w-full grid-cols-1 md:grid-cols-2 gap-2.5 overflow-auto custom-scrollbar py-1 px-1.5 auto-rows-min">
                                {RenderConteudoRegistro(registerLevel)}
                            </div>
                        ) : (
                            RenderConteudoRegistro(registerLevel)
                        )}
                        <div className="w-full flex justify-center md:justify-end ">
                            <div className=" flex justify-center w-full md:w-1/2 gap-3">
                                {registerLevel > 1 && (
                                    <CustomButton
                                        onClick={ParteAnterior}
                                        label="Anterior"
                                        className="mt-4 w-full md:w-1/2"
                                    />
                                )}
                                <CustomButton
                                    type="button"
                                    onClick={ProximoParte}
                                    label={
                                        registerLevel === 5
                                            ? "Finalizar"
                                            : "Próximo"
                                    }
                                    className="mt-4 w-full md:w-1/2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
