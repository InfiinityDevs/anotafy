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
import { CreateUsuario } from "@/types/types";

const usuarioSchema = z.object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    codigo_identificacao: z
        .string()
        .min(1, "Código de identificação é obrigatório"),
    login: z.string().min(3, "Login deve ter no mínimo 3 caracteres"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

interface UsuarioFormProps {
    onSubmit: () => void;
    onBack: () => void;
    usuario: CreateUsuario;
    setUsuario: React.Dispatch<React.SetStateAction<CreateUsuario>>;
}

export function UsuarioForm({
    onSubmit,
    onBack,
    usuario,
    setUsuario,
}: UsuarioFormProps) {
    const form = useForm<z.infer<typeof usuarioSchema>>({
        resolver: zodResolver(usuarioSchema),
        defaultValues: {
            nome: usuario.nome,
            codigo_identificacao: usuario.codigo_identificacao,
            login: usuario.login,
            senha: usuario.senha,
        },
    });

    const handleSubmit = (values: z.infer<typeof usuarioSchema>) => {
        const usuarioData: CreateUsuario = {
            ...usuario,
            nome: values.nome,
            codigo_identificacao: values.codigo_identificacao,
            login: values.login,
            senha: values.senha,
        };

        setUsuario(usuarioData);
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
                        name="nome"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>Nome Completo</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Digite o nome completo"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="codigo_identificacao"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>
                                    Código de Identificação
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Digite o código"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="login"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>Login</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Digite o login"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="senha"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>Senha</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Digite a senha"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-4 justify-end pt-4">
                    <Button type="button" variant="outline" onClick={onBack}>
                        Voltar
                    </Button>
                    <Button type="submit">Continuar</Button>
                </div>
            </form>
        </Form>
    );
}
