"use client";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Building2, MapPin, User, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmpresaForm } from "./EmpresaForm";
import { UnidadeForm } from "./UnidadeForm";
import { UsuarioForm } from "./UsuarioForm";
import {
    CreateEmpresa,
    CreateUnidade,
    CreateUsuario,
    TipoUnidade,
} from "@/types/types";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { cadastrarEmpresa } from "@/server/CadastroEmpresa";
import Link from "next/link";

type Step = 1 | 2 | 3 | 4;

export function RegistrationWizard() {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [finality, setFinality] = useState<boolean>(false);
    const [empresaData, setEmpresaData] = useState<CreateEmpresa>({
        cnae_principal: null,
        cnpj_raiz: null,
        data_fundacao: null,
        email_principal: "",
        logo_url: null,
        nome_fantasia: null,
        razao_social: "",
        telefone_principal: "",
        website: null,
    });
    const [unidadeData, setUnidadeData] = useState<CreateUnidade>({
        bairro: null,
        cep: null,
        cidade: null,
        codigo_ibge_municipio: null,
        complemento: null,
        cnpj: null,
        data_abertura: null,
        email: "",
        estado: null,
        logradouro: null,
        nome: "",
        numero: null,
        telefone: "",
        tipo_unidade: TipoUnidade.MATRIZ,
        empresa_id: 0,
    });
    const [usuarioData, setUsuarioData] = useState<CreateUsuario>({
        codigo_identificacao: "",
        login: "",
        nome: "",
        senha: "",
        unidade_id: 0,
    });

    const renderModal = (render = false) => {
        return render ? (
            <>
                <DialogTitle />
                <DialogContent className="sm:max-w-md [&>button]:hidden">
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                        <Loader className="w-16 h-16 text-primary animate-spin" />
                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-semibold">
                                Processando Cadastro
                            </h3>
                            <p className="text-muted-foreground">
                                Aguarde enquanto salvamos os dados da empresa,
                                unidade e usuário...
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </>
        ) : (
            <>
                <DialogTitle />
                <DialogContent className="sm:max-w-md [&>button]:hidden">
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                        <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-semibold">
                                Cadastro Finalizado
                            </h3>
                            <p className="text-muted-foreground">
                                Seu cadastro foi realizado com sucesso!
                            </p>
                            <Link href="/login" className="border-0">
                                <Button>Ir para Login</Button>
                            </Link>
                        </div>
                    </div>
                </DialogContent>
            </>
        );
    };

    const handleEmpresaSubmit = () => {
        setCurrentStep(2);
    };

    const handleUnidadeSubmit = () => {
        setCurrentStep(3);
    };

    const handleUsuarioSubmit = () => {
        setCurrentStep(4);
    };

    const handleFinalizarCadastro = async () => {
        setLoading(true);
        try {
            const result = await cadastrarEmpresa({
                empresa: empresaData,
                unidade: unidadeData,
                usuario: usuarioData,
            });
            console.log(result);
            if (result) {
                setFinality(false);
                return;
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const steps = [
        {
            number: 1,
            title: "Empresa",
            icon: Building2,
            completed: currentStep > 1,
        },
        {
            number: 2,
            title: "Unidade",
            icon: MapPin,
            completed: currentStep > 2,
        },
        { number: 3, title: "Usuário", icon: User, completed: currentStep > 3 },
        {
            number: 4,
            title: "Finalização",
            icon: CheckCircle2,
            completed: currentStep === 4,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Modal de Carregamento */}
            <Dialog open={loading}>{renderModal(finality)}</Dialog>
            {/* Stepper */}
            <div className="flex items-center justify-center">
                <div className="flex items-center gap-2 md:gap-4 mb-2">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = currentStep === step.number;
                        const isCompleted = step.completed;

                        return (
                            <div
                                key={step.number}
                                className="relative flex items-center"
                            >
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all ${
                                            isCompleted
                                                ? "border-primary bg-primary text-white"
                                                : isActive
                                                ? "border-primary bg-primary text-white"
                                                : "border-muted-foreground/30 text-muted-foreground"
                                        }`}
                                    >
                                        <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <span
                                        className={`absolute top-full text-xs md:text-sm mt-2 font-medium text-muted-foreground`}
                                    >
                                        {step.title}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`w-12 md:w-24 h-0.5 mx-2 ${
                                            step.completed
                                                ? "bg-primary/70"
                                                : "bg-muted-foreground/30"
                                        }`}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Content */}
            <Card className="shadow-(--shadow-medium) border-border/50">
                {currentStep === 1 && (
                    <>
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center gap-2">
                                <Building2 className="w-6 h-6 text-primary" />
                                Cadastro de Empresa
                            </CardTitle>
                            <CardDescription>
                                Preencha os dados da empresa para iniciar o
                                cadastro
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <EmpresaForm
                                onSubmit={handleEmpresaSubmit}
                                empresa={empresaData}
                                setEmpresa={setEmpresaData}
                            />
                        </CardContent>
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center gap-2">
                                <MapPin className="w-6 h-6 text-primary" />
                                Cadastro de Unidade
                            </CardTitle>
                            <CardDescription>
                                Preencha os dados da unidade
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UnidadeForm
                                onSubmit={handleUnidadeSubmit}
                                onBack={() => setCurrentStep(1)}
                                unidade={unidadeData}
                                setUnidade={setUnidadeData}
                            />
                        </CardContent>
                    </>
                )}

                {currentStep === 3 && (
                    <>
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center gap-2">
                                <User className="w-6 h-6 text-primary" />
                                Cadastro de Usuário
                            </CardTitle>
                            <CardDescription>
                                Preencha os dados do usuário
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UsuarioForm
                                onSubmit={handleUsuarioSubmit}
                                onBack={() => setCurrentStep(2)}
                                usuario={usuarioData}
                                setUsuario={setUsuarioData}
                            />
                        </CardContent>
                    </>
                )}

                {currentStep === 4 && (
                    <>
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6 text-success" />
                                Finalizar Cadastro
                            </CardTitle>
                            <CardDescription>
                                Faça a confirmação do cadastro
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="rounded-lg bg-success/10 border border-success/20 p-6 text-center">
                                    <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">
                                        Cheque as suas informações!
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-left">
                                        <div className="rounded-lg bg-card border p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Building2 className="w-5 h-5 text-primary" />
                                                <h4 className="font-semibold">
                                                    Empresa
                                                </h4>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {empresaData?.razao_social}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {empresaData?.cnpj_raiz}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-card border p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <MapPin className="w-5 h-5 text-primary" />
                                                <h4 className="font-semibold">
                                                    Unidade
                                                </h4>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {unidadeData?.nome}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {unidadeData?.cidade} -{" "}
                                                {unidadeData?.estado}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-card border p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <User className="w-5 h-5 text-primary" />
                                                <h4 className="font-semibold">
                                                    Usuário
                                                </h4>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {usuarioData?.nome}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Login: {usuarioData?.login}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center gap-3">
                                    <Button
                                        variant={"outline"}
                                        onClick={() => setCurrentStep(3)}
                                        size="lg"
                                    >
                                        Voltar
                                    </Button>
                                    <Button
                                        onClick={handleFinalizarCadastro}
                                        size="lg"
                                    >
                                        Finalizar Cadastro
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </>
                )}
            </Card>
        </div>
    );
}
