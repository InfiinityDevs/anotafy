"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { maskCNPJRaiz, maskPhone, removeMask } from "@/lib/masks";
import { CreateEmpresa } from "@/types/types";

const empresaSchema = z.object({
    razao_social: z
        .string()
        .min(3, "Razão social deve ter no mínimo 3 caracteres")
        .max(200),
    nome_fantasia: z
        .string()
        .min(3, "Nome fantasia deve ter no mínimo 3 caracteres")
        .max(200)
        .or(z.literal("")),
    cnpj_raiz: z.string().min(8, "CNPJ raiz inválido").or(z.literal("")),
    data_fundacao: z
        .string()
        .min(1, "Data de fundação é obrigatória")
        .or(z.literal("")),
    cnae_principal: z.string().min(1, "CNAE é obrigatório").or(z.literal("")),
    telefone_principal: z.string().min(10, "Telefone inválido"),
    email_principal: z.string().email("Email inválido").max(255),
    website: z.string().url("URL inválida").or(z.literal("")),
    logo_url: z.string().url("URL inválida").or(z.literal("")),
});

type EmpresaFormValues = z.infer<typeof empresaSchema>;

interface EmpresaFormProps {
    onSubmit: () => void;
    empresa?: CreateEmpresa | null;
    setEmpresa: React.Dispatch<React.SetStateAction<CreateEmpresa>>;
}

export function EmpresaForm({
    onSubmit,
    empresa,
    setEmpresa,
}: EmpresaFormProps) {
    const form = useForm<EmpresaFormValues>({
        resolver: zodResolver(empresaSchema),
        defaultValues: {
            razao_social: empresa?.razao_social || "",
            nome_fantasia: empresa?.nome_fantasia || "",
            cnpj_raiz: maskCNPJRaiz(empresa?.cnpj_raiz || ""),
            data_fundacao: empresa?.data_fundacao || "",
            cnae_principal: empresa?.cnae_principal || "",
            telefone_principal: maskPhone(empresa?.telefone_principal || ""),
            email_principal: empresa?.email_principal || "",
            website: empresa?.website || "",
            logo_url: empresa?.logo_url || "",
        },
    });

    const handleSubmit = (values: EmpresaFormValues) => {
        const empresaAtualizada: CreateEmpresa = {
            ...empresa,
            razao_social: values.razao_social,
            nome_fantasia: values.nome_fantasia || null,
            cnpj_raiz: removeMask(values.cnpj_raiz) || null,
            data_fundacao: values.data_fundacao || null,
            cnae_principal: values.cnae_principal || null,
            telefone_principal: removeMask(values.telefone_principal),
            email_principal: values.email_principal,
            website: values.website || null,
            logo_url: values.logo_url || null,
        };

        setEmpresa(empresaAtualizada);
        onSubmit();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="razao_social"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>Razão Social</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Empresa Exemplo LTDA"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="nome_fantasia"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome Fantasia</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Exemplo Empresa"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cnpj_raiz"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CNPJ Raiz</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="12.345.678"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(
                                                maskCNPJRaiz(e.target.value)
                                            )
                                        }
                                        maxLength={10}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="data_fundacao"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data de Fundação</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cnae_principal"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CNAE Principal</FormLabel>
                                <FormControl>
                                    <Input placeholder="1234-5/67" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="telefone_principal"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>
                                    Telefone Principal
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="(11) 98765-4321"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(
                                                maskPhone(e.target.value)
                                            )
                                        }
                                        maxLength={15}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email_principal"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>Email Principal</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="contato@empresa.com.br"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://www.empresa.com.br"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="logo_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL do Logotipo</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://exemplo.com/logo.png"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit">Continuar</Button>
                </div>
            </form>
        </Form>
    );
}
