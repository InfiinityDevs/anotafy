"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/controllers/auth-controller";

const initialState = {
    error: null as string | null,
};

export function LoginForm() {
    const [state, formAction] = useActionState(loginAction, initialState);

    return (
        <form
            action={formAction}
            className="bg-white p-8 rounded shadow-md w-96"
        >
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

            <div className="mb-4">
                <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="login"
                >
                    Login
                </label>
                <input
                    id="login"
                    name="login"
                    type="text"
                    required
                    className="w-full border p-2 rounded"
                    placeholder="admin"
                />
            </div>

            <div className="mb-6">
                <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="password"
                >
                    Senha
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full border p-2 rounded"
                    placeholder="******"
                />
            </div>

            {state?.error && (
                <p className="mb-4 text-sm text-red-600">{state.error}</p>
            )}

            <SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-70"
            disabled={pending}
        >
            {pending ? "Entrando..." : "Entrar"}
        </button>
    );
}
