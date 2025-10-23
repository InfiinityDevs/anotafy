import {
    CircleX,
    CheckCircle,
    AlertCircle,
    AlertTriangle,
    Info,
} from "lucide-react";
import { useEffect, useState } from "react";

export interface IAlert {
    type: "success" | "error" | "info" | "warning";
    title?: string;
    message: string;
    duration?: number;
    open: boolean;
}

interface AlertProps {
    type: "success" | "error" | "info" | "warning";
    title?: string;
    message: string;
    open: boolean;
    duration?: number;
    onClose: () => void;
}

const alertConfig = {
    success: {
        class: "bg-green-50 border-green-200 text-green-800",
        icon: CheckCircle,
        iconClass: "text-green-500",
        button: "text-green-400",
    },
    error: {
        class: "bg-red-50 border-red-200 text-red-800",
        icon: AlertCircle,
        iconClass: "text-red-500",
        button: "text-red-400",
    },
    info: {
        class: "bg-blue-50 border-blue-200 text-blue-800",
        icon: Info,
        iconClass: "text-blue-500",
        button: "text-blue-400",
    },
    warning: {
        class: "bg-yellow-50 border-yellow-200 text-yellow-800",
        icon: AlertTriangle,
        iconClass: "text-yellow-500",
        button: "text-yellow-400",
    },
};

export default function Alert({
    type,
    title,
    message,
    open,
    duration = 5000,
    onClose,
}: AlertProps) {
    const [isVisible, setIsVisible] = useState(open);
    const [isClosing, setIsClosing] = useState(false);

    const config = alertConfig[type];
    const IconComponent = config.icon;

    useEffect(() => {
        if (open) {
            setIsVisible(true);
            setIsClosing(false);

            if (duration > 0) {
                const timer = setTimeout(() => {
                    handleClose();
                }, duration);

                return () => clearTimeout(timer);
            }
        }
    }, [open, duration]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`
                fixed top-4 right-4 w-96 z-50 
                border rounded-xl flex p-4 
                shadow-lg transition-all duration-300
                ${config.class}
                ${
                    isClosing
                        ? "opacity-0 translate-x-full"
                        : "opacity-100 translate-x-0"
                }
            `}
            role="alert"
            aria-live="polite"
        >
            {/* Ícone */}
            <div className="shrink-0 mr-3">
                <IconComponent size={24} className={config.iconClass} />
            </div>

            {/* Conteúdo */}
            <div className="flex-1 min-w-0">
                {title && (
                    <h3 className="font-semibold text-lg mb-1 truncate">
                        {title}
                    </h3>
                )}
                <p className="text-sm leading-relaxed wrap-break-word">
                    {message}
                </p>
            </div>

            {/* Botão Fechar */}
            <button
                onClick={handleClose}
                className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                aria-label="Fechar alerta"
            >
                <CircleX size={20} className={config.button} />
            </button>
        </div>
    );
}
