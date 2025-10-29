import { useState } from "react";
import { StatusEmpresa } from "../../../types/enums/StatusEmpresa";
import type { StatusUnidade } from "../../../types/enums/StatusUnidade";
import type { TipoUnidade } from "../../../types/enums/TipoUnidade";
import Logo from "../../../components/Logo";
import Stepper from "../../../components/Stepper";
import Input from "../../../components/Input";

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


export default function Register() {
    const [empresa, setEmpresa] = useState<IRegisterEmpresa>({
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
    });
    
    const [registerLevel, setRegisterLevel] = useState<number>(1);

    const formatDateForInput = (date: string | Date) => {
        if (!date) return "";
        if (typeof date === "string") {
            return date.split("T")[0]; // Remove time part if exists
        }
        return date.toISOString().split("T")[0];
    };


    return (
        <div className="flex flex-col gap-3 justify-center items-center w-full my-h-screen bg-backgound">
            <div className="top-15 right-0 left-0 w-full justify-center flex items-center gap-2">
                <Logo className="w-10" />
                <h1 className="font-black text-xl select-none">ANOTAFY</h1>
            </div>
            <div className="flex flex-col bg-foreground py-6 w-5/6 md:w-4/5 h-4/5 rounded-lg p-4 shadow-lg ">
                <Stepper currentStep={registerLevel} totalSteps={5} />
                <div>
                    <span>Informações da Empresa</span>
                    <div>
                        <Input
                            type="text"
                            value={empresa.razao_social}
                            onChange={(value) =>
                                setEmpresa((prev) => ({
                                    ...prev,
                                    razao_social: value,
                                }))
                            }
                            placeholder="Razão Social"
                            label="Razão Social"
                            required
                        />

                        <Input
                            type="text"
                            value={empresa.nome_fantasia}
                            onChange={(value) =>
                                setEmpresa((prev) => ({
                                    ...prev,
                                    nome_fantasia: value,
                                }))
                            }
                            placeholder="Nome Fantasia"
                            label="Nome Fantasia"
                        />

                        <Input
                            type="text"
                            value={empresa.cnpj_raiz}
                            onChange={(value) =>
                                setEmpresa((prev) => ({
                                    ...prev,
                                    cnpj_raiz: value,
                                }))
                            }
                            placeholder="CNPJ Raiz"
                            label="CNPJ Raiz"
                            required
                        />

                        <Input
                            type="date"
                            value={formatDateForInput(empresa.data_fundacao)}
                            onChange={(value) =>
                                setEmpresa((prev) => ({
                                    ...prev,
                                    data_fundacao: value,
                                }))
                            }
                            placeholder="Data Fundação"
                            label="Data Fundação"
                        />

                        <Input
                            type="text"
                            value={empresa.cnae_principal}
                            onChange={(value) =>
                                setEmpresa((prev) => ({
                                    ...prev,
                                    cnae_principal: value,
                                }))
                            }
                            placeholder="CNAE Principal"
                            label="CNAE Principal"
                        />

                        <Input
                            type="tel"
                            value={empresa.telefone_principal}
                            onChange={(value) =>
                                setEmpresa((prev) => ({
                                    ...prev,
                                    telefone_principal: value,
                                }))
                            }
                            placeholder="Telefone Principal"
                            label="Telefone Principal"
                        />

                        <Input
                            type="email"
                            value={empresa.email_principal}
                            onChange={(value) =>
                                setEmpresa((prev) => ({
                                    ...prev,
                                    email_principal: value,
                                }))
                            }
                            placeholder="Email Principal"
                            label="Email Principal"
                        />

                        <Input
                            type="url"
                            value={empresa.website}
                            onChange={(value) =>
                                setEmpresa((prev) => ({
                                    ...prev,
                                    website: value,
                                }))
                            }
                            placeholder="Website"
                            label="Website"
                        />

                        <Input
                            type="url"
                            value={empresa.logo_url}
                            onChange={(value) =>
                                setEmpresa((prev) => ({
                                    ...prev,
                                    logo_url: value,
                                }))
                            }
                            placeholder="Logo URL"
                            label="Logo URL"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
