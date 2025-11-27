"use client";

import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import deliveryHero from "@/assets/ilustration-login.png";
import { useState } from "react";
import { z } from "zod";
import { registerEnterprice, verifyCpfCnpjExists } from "@/services/enterprice-service";
import { verifyEmailExists } from "@/services/employee-service";
import { verifyLoginExists } from "@/services/user-service";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

const enterpriseSchema = z.object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    estado: z.string().length(2, "Use a sigla (ex: SP)"),
    cidade: z.string().min(1, "Cidade obrigatória"),
    bairro: z.string().min(1, "Bairro obrigatório"),
    logradouro: z.string().min(1, "Rua obrigatória"),
    numero: z.string().min(1, "Número obrigatório"),
    cnpj_ou_cpf: z.string().min(11, "Documento inválido"),
});

const employeeSchema = z.object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    telefone: z.string().min(10, "Telefone inválido"),
    email: z.string().email("Email inválido"),
});

const userSchema = z.object({
    login: z.string().min(4, "Login deve ter no mínimo 4 caracteres"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

// Tipos inferidos do Zod (opcional, mas boa prática)
type EnterpriseData = z.infer<typeof enterpriseSchema>;
type EmployeeData = z.infer<typeof employeeSchema>;
type UserData = z.infer<typeof userSchema>;

export interface RegisterEnterpriceProps {
    enterprice: EnterpriseData;
    employee: EmployeeData;
    user: UserData;
}

// Estado inicial limpo
const INITIAL_DATA: RegisterEnterpriceProps = {
    enterprice: {
        nome: "",
        estado: "",
        cidade: "",
        bairro: "",
        logradouro: "",
        numero: "",
        cnpj_ou_cpf: "",
    },
    employee: { nome: "", telefone: "", email: "" },
    user: { login: "", password: "" },
};

export default function RegisterForm() {
    const [formData, setFormData] =
        useState<RegisterEnterpriceProps>(INITIAL_DATA);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [step, setStep] = useState(1);
    const [dialog, setDialog] = useState([false, "", ""]);

    const validateCurrentStep = async () => {
        try {
            setErrors({});

            if (step === 1) {
                const existCpnjCpf = await verifyCpfCnpjExists(
                    formData.enterprice.cnpj_ou_cpf
                );
                if (existCpnjCpf) {
                    setErrors({
                        cnpj_ou_cpf: "CNPJ ou CPF já cadastrado.",
                    });
                    return false;
                }
                enterpriseSchema.parse(formData.enterprice);
            } else if (step === 2) {
                const emailExists = await verifyEmailExists(formData.employee.email);
                if (emailExists) {
                    setErrors({
                        email: "Email já está em uso.",
                    });
                    return false;
                }
                employeeSchema.parse(formData.employee);
            } else if (step === 3) {
                userSchema.parse(formData.user);
            }
            return true; // Se passar sem erro
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Transforma o erro complexo do Zod em um objeto simples { campo: mensagem }
                const newErrors: Record<string, string> = {};
                error.issues.forEach((err) => {
                    if (err.path[0]) {
                        newErrors[err.path[0].toString()] = err.message;
                    }
                });
                setErrors(newErrors);
            }
            return false;
        }
    };

    const nextStep = async () => {
        // Só avança se validar
        const isValid = await validateCurrentStep();
        if (!isValid) return;

        if (step < 3) {
            setStep((prev) => prev + 1);
        } else {
            const loginExists = await verifyLoginExists(formData.user.login);
            if (loginExists) {
                setErrors({
                    login: "Login já está em uso.",
                });
                return;
            }
            handleLogin();
        }
    };

    const prevStep = () => {
        setErrors({}); // Limpa erros ao voltar
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const handleLogin = async () => {
        const registerSuccess = await registerEnterprice(formData);
        if (registerSuccess) {
            setDialog([true, "Cadastro realizado!", "Você já pode fazer login agora."]);
        } else {
            setDialog([true, "Erro no cadastro", "Tente novamente mais tarde."]);
        }
    };

    return (
        <div className="min-h-screen flex w-full bg-background">
            <AlertDialog open={dialog[0] as boolean} onOpenChange={(open) => setDialog([open, "", ""])}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {dialog[1]}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {dialog[2]}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => window.location.href = "/login"}>
                            Ir para Login
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="flex-1 flex items-center justify-center p-8 bg-background">
                <Card className="flex max-h-[85vh] w-full max-w-md flex-col gap-5 p-8">
                    <div className="w-full flex flex-col justify-center items-center">
                        <h1 className="font-bold text-3xl text-primary">
                            Anotafy
                        </h1>
                        <p className="text-muted-foreground font-semibold">
                            {step === 1
                                ? "Cadastro da Empresa"
                                : step === 2
                                ? "Dados do Funcionário"
                                : "Crie seu Usuário"}
                        </p>
                        <p className="text-muted-foreground">
                            Passo {step} de 3
                        </p>
                    </div>

                    {/* Container de scroll ajustado */}
                    <div className="flex-1 overflow-y-auto min-h-0 py-2 px-1">
                        <ManagerForm
                            level={step}
                            formData={formData}
                            setFormData={setFormData}
                            errors={errors} // Passamos os erros para baixo
                        />
                    </div>

                    <div className="flex flex-row gap-4 pt-2">
                        <Button
                            onClick={prevStep}
                            variant={"outline"}
                            className={`h-12 flex-1 ${step === 1 && "hidden"}`}
                        >
                            Voltar
                        </Button>
                        <Button onClick={nextStep} className="h-12 flex-1">
                            {step < 3 ? "Próximo" : "Cadastrar"}
                        </Button>
                    </div>
                    <span className="text-center">
                        Já tem uma conta?{" "}
                        <a
                            href="/login"
                            className="text-primary font-medium hover:text-primary/80"
                        >
                            Faça login
                        </a>
                    </span>
                </Card>
            </div>

            {/* Lado direito (imagem) mantido igual */}
            <div className="hidden lg:flex flex-1 relative overflow-hidden bg-muted">
                <div className="absolute inset-0 bg-linear-to-br from-primary/60 to-primary/20 z-10" />
                <Image
                    src={deliveryHero}
                    alt="Hero"
                    className="absolute w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

// --- 3. INPUT REUTILIZÁVEL MELHORADO ---
function InputForm({
    label,
    type,
    required,
    value,
    onChange,
    error, // Recebe o erro específico deste campo
}: {
    label: string;
    type?: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}) {
    return (
        <div className="flex flex-col w-full gap-2 px-1">
            <Label className={`ml-1 ${error ? "text-red-500" : ""}`}>
                {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`h-12 ${
                    error ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
            />
            {error && (
                <span className="text-xs text-red-500 ml-1">{error}</span>
            )}
        </div>
    );
}

// --- 4. FORMULÁRIOS ESPECÍFICOS ---

interface ManagerFormProps {
    level: number;
    formData: RegisterEnterpriceProps;
    setFormData: React.Dispatch<React.SetStateAction<RegisterEnterpriceProps>>;
    errors: Record<string, string>;
}

function ManagerForm({
    level,
    formData,
    setFormData,
    errors,
}: ManagerFormProps) {
    // Helper para passar apenas as props necessárias
    const props = { formData, setFormData, errors };

    if (level === 1) return <RegisterEnterpriceForm {...props} />;
    if (level === 2) return <RegisterEmployeeForm {...props} />;
    return <RegisterUserForm {...props} />;
}

type SubFormProps = Omit<ManagerFormProps, "level">;

function RegisterEnterpriceForm({
    formData,
    setFormData,
    errors,
}: SubFormProps) {
    const update = (field: keyof EnterpriseData, val: string) => {
        setFormData((prev) => ({
            ...prev,
            enterprice: { ...prev.enterprice, [field]: val },
        }));
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <InputForm
                label="Nome da Empresa"
                required
                value={formData.enterprice.nome}
                onChange={(v) => update("nome", v)}
                error={errors.nome}
            />
            <InputForm
                label="CNPJ ou CPF"
                required
                value={formData.enterprice.cnpj_ou_cpf}
                onChange={(v) => update("cnpj_ou_cpf", v)}
                error={errors.cnpj_ou_cpf}
            />
            <div className="flex gap-2">
                <InputForm
                    label="Estado"
                    required
                    value={formData.enterprice.estado}
                    onChange={(v) => update("estado", v)}
                    error={errors.estado}
                />
                <InputForm
                    label="Cidade"
                    required
                    value={formData.enterprice.cidade}
                    onChange={(v) => update("cidade", v)}
                    error={errors.cidade}
                />
            </div>
            <InputForm
                label="Bairro"
                required
                value={formData.enterprice.bairro}
                onChange={(v) => update("bairro", v)}
                error={errors.bairro}
            />
            <div className="flex gap-2">
                <div className="flex-1">
                    <InputForm
                        label="Logradouro"
                        required
                        value={formData.enterprice.logradouro}
                        onChange={(v) => update("logradouro", v)}
                        error={errors.logradouro}
                    />
                </div>
                <div className="w-24">
                    <InputForm
                        label="Número"
                        required
                        value={formData.enterprice.numero}
                        onChange={(v) => update("numero", v)}
                        error={errors.numero}
                    />
                </div>
            </div>
        </div>
    );
}

function RegisterEmployeeForm({ formData, setFormData, errors }: SubFormProps) {
    const update = (field: keyof EmployeeData, val: string) => {
        setFormData((prev) => ({
            ...prev,
            employee: { ...prev.employee, [field]: val },
        }));
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <InputForm
                label="Nome do Funcionário"
                required
                value={formData.employee.nome}
                onChange={(v) => update("nome", v)}
                error={errors.nome}
            />
            <InputForm
                label="Telefone"
                required
                value={formData.employee.telefone}
                onChange={(v) => update("telefone", v)}
                error={errors.telefone}
            />
            <InputForm
                label="Email"
                required
                type="email"
                value={formData.employee.email}
                onChange={(v) => update("email", v)}
                error={errors.email}
            />
        </div>
    );
}

function RegisterUserForm({ formData, setFormData, errors }: SubFormProps) {
    const update = (field: keyof UserData, val: string) => {
        setFormData((prev) => ({
            ...prev,
            user: { ...prev.user, [field]: val },
        }));
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <InputForm
                label="Login"
                required
                value={formData.user.login}
                onChange={(v) => update("login", v)}
                error={errors.login}
            />
            <InputForm
                label="Senha"
                type="password"
                required
                value={formData.user.password}
                onChange={(v) => update("password", v)}
                error={errors.password}
            />
        </div>
    );
}
