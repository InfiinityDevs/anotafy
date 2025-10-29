import { useState } from "react";
import type { StatusEmpresa } from "../../../types/enums/StatusEmpresa";
import type { StatusUnidade } from "../../../types/enums/StatusUnidade";
import type { TipoUnidade } from "../../../types/enums/TipoUnidade";
import Logo from "../../../components/Logo";

interface IRegisterEmpresa {
    razao_social: string;
    nome_fantasia: string;
    cnpj_raiz: string;
    data_fundacao: Date;
    cnae_principal: string;
    telefone_principal: string;
    email_principal: string;
    website?: string;
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
    const [empresa, setEmpresa] = useState<IRegisterEmpresa>();
    const [registerLevel, setRegisterLevel] = useState<number>(0);

    return (
        <div className="flex justify-center items-center w-full my-h-screen bg-backgound">
            <div className="relative flex bg-foreground py-6 w-4/5 h-4/5 rounded-lg p-4">
                <div className="absolute -top-15 right-0 left-0 w-full justify-center flex items-center gap-2">
                    <Logo className="w-10" />
                    <h1 className="font-black text-xl select-none">ANOTAFY</h1>
                </div>
                <div className="h-20 w-full bg-red-300">
                    <span></span>
                    <div></div>
                </div>
                {registerLevel === 0 && (
                    <div>

                    </div>
                )}
            </div>
        </div>
    );
}
