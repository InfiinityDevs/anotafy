import { prisma } from "@/lib/prisma";
import { RegisterEnterpriceProps } from "@/components/RegisterForm";
import { TypeUser } from "../../generated/prisma/enums";

const repo = prisma.enterprise;

export async function findByCnpjCpf(cpfCnpj: string) {
    return await repo.findFirst({
        where: { cnpj_cpf: cpfCnpj },
    });
}

export async function createEnterprice(data: RegisterEnterpriceProps) {
    return await repo.create({
        data: {
            cnpj_cpf: data.enterprice.cnpj_ou_cpf,
            name: data.enterprice.nome,
            address: data.enterprice.estado + ";" + data.enterprice.cidade + ";" + data.enterprice.bairro + ";" + data.enterprice.logradouro + ";" + data.enterprice.numero,
            active: true,
            employees: {
                create: {
                    name: data.employee.nome,
                    email: data.employee.email,
                    phone: data.employee.telefone,
                    position: {
                        create: {
                            title: "Administrador",
                            description: "Administrador inicial da empresa",
                            enterprise: {
                                connect: { cnpj_cpf: data.enterprice.cnpj_ou_cpf}
                            }
                        },
                    },
                    user: {
                        create: {
                            login: data.user.login,
                            password: data.user.password,
                            type_user: TypeUser.EMPLOYEE,
                            active: true,
                        }
                    },

                }
            },
        },
        include: { employees: true },
    });
}
