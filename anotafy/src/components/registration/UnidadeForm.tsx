"use client";
import { useForm, useWatch } from "react-hook-form";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { maskCNPJ, maskCEP, maskPhone, removeMask } from "@/lib/masks";
import { CreateUnidade, TipoUnidade } from "@/types/types";

const unidadeSchema = z.object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(200),
    tipo_unidade: z.nativeEnum(TipoUnidade),
    cnpj: z.string().min(14, "CNPJ inválido").or(z.literal("")),
    cep: z.string().min(8, "CEP inválido").or(z.literal("")),
    logradouro: z
        .string()
        .min(3, "Logradouro é obrigatório")
        .max(200)
        .or(z.literal("")),
    numero: z.string().min(1, "Número é obrigatório").or(z.literal("")),
    complemento: z.string().max(100).or(z.literal("")),
    bairro: z
        .string()
        .min(2, "Bairro é obrigatório")
        .max(100)
        .or(z.literal("")),
    cidade: z
        .string()
        .min(2, "Cidade é obrigatória")
        .max(100)
        .or(z.literal("")),
    estado: z.string().length(2, "UF deve ter 2 caracteres").or(z.literal("")),
    codigo_ibge_municipio: z
        .string()
        .length(7, "Código IBGE inválido")
        .or(z.literal("")),
    telefone: z.string().min(10, "Telefone inválido"),
    email: z.string().email("Email inválido").max(255),
    data_abertura: z
        .string()
        .min(1, "Data de abertura é obrigatória")
        .optional()
        .or(z.literal("")),
    matriz_id: z.string().optional(),
});

type UnidadeFormValues = z.infer<typeof unidadeSchema>;

interface UnidadeFormProps {
    onSubmit: () => void;
    onBack?: () => void;
    unidade: CreateUnidade;
    setUnidade: React.Dispatch<React.SetStateAction<CreateUnidade>>;
}

export function UnidadeForm({
    onSubmit,
    onBack,
    unidade,
    setUnidade,
}: UnidadeFormProps) {
    const form = useForm<UnidadeFormValues>({
        resolver: zodResolver(unidadeSchema),
        defaultValues: {
            nome: unidade.nome,
            tipo_unidade: unidade.tipo_unidade,
            cnpj: unidade.cnpj ? maskCNPJ(unidade.cnpj) : "",
            cep: unidade.cep ? maskCEP(unidade.cep) : "",
            logradouro: unidade.logradouro || "",
            numero: unidade.numero || "",
            complemento: unidade.complemento || "",
            bairro: unidade.bairro || "",
            cidade: unidade.cidade || "",
            estado: unidade.estado || "",
            codigo_ibge_municipio: unidade.codigo_ibge_municipio || "",
            telefone: unidade.telefone,
            email: unidade.email,
        },
    });

    const handleSubmit = (values: UnidadeFormValues) => {
        const unidadeData: CreateUnidade = {
            ...unidade,
            nome: values.nome,
            tipo_unidade: values.tipo_unidade,
            cnpj: values.cnpj ? removeMask(values.cnpj) : null,
            cep: values.cep ? removeMask(values.cep) : null,
            logradouro: values.logradouro,
            numero: values.numero,
            complemento: values.complemento,
            bairro: values.bairro,
            cidade: values.cidade,
            estado: values.estado,
            codigo_ibge_municipio: values.codigo_ibge_municipio,
            telefone: values.telefone,
            email: values.email,
        };

        setUnidade(unidadeData);

        onSubmit();
    };

    const tipoUnidade = useWatch({
        control: form.control,
        name: "tipo_unidade",
    });

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
                                <FormLabel required>Nome da Unidade</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Matriz - São Paulo"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tipo_unidade"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>Tipo de Unidade</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o tipo" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={TipoUnidade.MATRIZ}>
                                            Matriz
                                        </SelectItem>
                                        <SelectItem value={TipoUnidade.FILIAL}>
                                            Filial
                                        </SelectItem>
                                        <SelectItem
                                            value={TipoUnidade.DEPOSITO}
                                        >
                                            Deposito
                                        </SelectItem>
                                        <SelectItem
                                            value={TipoUnidade.ESCRITORIO}
                                        >
                                            Escritório
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {tipoUnidade === TipoUnidade.FILIAL && (
                        <FormField
                            control={form.control}
                            name="matriz_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ID da Matriz</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="1"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="cnpj"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CNPJ</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="12.345.678/0001-90"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(
                                                maskCNPJ(e.target.value)
                                            )
                                        }
                                        maxLength={18}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cep"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CEP</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="12345-678"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(
                                                maskCEP(e.target.value)
                                            )
                                        }
                                        maxLength={9}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="logradouro"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Logradouro</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Rua Exemplo"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="numero"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número</FormLabel>
                                <FormControl>
                                    <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="complemento"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Complemento</FormLabel>
                                <FormControl>
                                    <Input placeholder="Sala 45" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="bairro"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bairro</FormLabel>
                                <FormControl>
                                    <Input placeholder="Centro" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cidade"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cidade</FormLabel>
                                <FormControl>
                                    <Input placeholder="São Paulo" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="estado"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado (UF)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="SP"
                                        {...field}
                                        maxLength={2}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="codigo_ibge_municipio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Código IBGE</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="3550308"
                                        {...field}
                                        maxLength={7}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="telefone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>Telefone</FormLabel>
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="unidade@empresa.com.br"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="data_abertura"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data de Abertura</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-4 justify-end pt-4">
                    {onBack && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onBack}
                        >
                            Voltar
                        </Button>
                    )}
                    <Button type="submit">Continuar</Button>
                </div>
            </form>
        </Form>
    );
}
