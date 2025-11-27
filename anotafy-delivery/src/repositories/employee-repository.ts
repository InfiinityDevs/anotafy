import { prisma } from "@/lib/prisma";

const repoEmployee = prisma.employee;

export async function findEmployeeByEmail(email: string) {
    return await repoEmployee.findFirst({
        where: { email },
    });
}
