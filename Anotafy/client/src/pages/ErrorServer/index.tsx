import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ErrorServer() {
    const location = useLocation();
    const [countdown, setCountdown] = useState(30);

    useEffect(() => {
        console.error(
            "Server Error: API unavailable at route:",
            location.pathname
        );

        // Countdown para tentar novamente
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [location.pathname]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="text-center max-w-md mx-4 p-8 bg-white rounded-lg shadow-lg">
                {/* Ícone de erro */}
                <div className="mb-6">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                        <span className="text-3xl text-red-600">⚠️</span>
                    </div>
                </div>

                <h1 className="mb-4 text-4xl font-bold text-gray-800">
                    Servidor Indisponível
                </h1>

                <p className="mb-6 text-lg text-gray-600">
                    Estamos enfrentando problemas técnicos em nossos servidores.
                </p>

                <div className="mb-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800">
                        <strong>O que pode estar acontecendo:</strong>
                    </p>
                    <ul className="text-sm text-yellow-700 mt-2 text-left list-disc list-inside">
                        <li>Manutenção programada</li>
                        <li>Problemas temporários</li>
                        <li>Alta demanda no momento</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => window.location.href = "/"}
                        disabled={countdown > 0}
                        className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
                            countdown > 0
                                ? "bg-gray-400 cursor-not-allowed text-gray-200"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                    >
                        {countdown > 0
                            ? `Tentar novamente em ${countdown}s`
                            : "Tentar Novamente"}
                    </button>

                    <a
                        href="/"
                        className="inline-block w-full bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                    >
                        Voltar para Home
                    </a>
                </div>

                <div className="mt-8 text-sm text-gray-500">
                    <p>
                        Se o problema persistir, entre em contato com nosso
                        suporte.
                    </p>
                    <p className="mt-2">suporte@empresa.com | (11) 9999-9999</p>
                </div>
            </div>
        </div>
    );
}
