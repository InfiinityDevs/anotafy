"use server";
import { findEmployeeByEmail } from "@/repositories/employee-repository";

export async function verifyEmailExists(email: string): Promise<boolean> {
    const existing = await findEmployeeByEmail(email);
    return !!existing;
}
