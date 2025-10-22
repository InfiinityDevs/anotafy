import { Eye, EyeOff, Lock, type LucideIcon } from "lucide-react";
import React, { useState } from "react";

interface InputProps {
    type?: "text" | "password" | "email";
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    label?: string | undefined;
    disabled?: boolean;
    required?: boolean;
    icon?: "lock" | React.ReactNode | LucideIcon | undefined;
}

export default function Input({
    type = "text",
    value,
    onChange,
    placeholder,
    label,
    disabled = false,
    required = false,
    icon
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const currentType = isPassword && showPassword ? "text" : type;

    const renderIcon = () => {
        if (icon === "lock") {
            return <Lock size={20} />;
        } else if (typeof icon === "function") {
            const IconComponent = icon as LucideIcon;
            return <IconComponent size={20} />;
        } else if (React.isValidElement(icon)) {
            return icon;
        }
        return null;
    }

    return (
        <div>
            {label && (
                <label className="block text-md font-medium text-gray-500 mb-2">
                    {label}
                </label>
            )}
            <div className="flex items-center w-full bg-gray-100 border border-gray-300 rounded-lg transition-all focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 px-2.5">
                {/* Ícone esquerdo */}
                {renderIcon() && (
                    <div className="mr-2 text-gray-500">{renderIcon()}</div>
                )}

                {/* Input */}
                <input
                    onChange={(e) => onChange(e.target.value)}
                    type={currentType}
                    className="px-2 py-3 w-full bg-transparent border-none outline-none rounded-lg text-gray-500"
                    placeholder={placeholder}
                    required={required}
                    value={value}
                    disabled={disabled}
                />

                {/* Botão de mostrar/ocultar senha */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-500 hover:text-gray-700"
                        disabled={disabled}
                    >
                        {showPassword ? (
                            <EyeOff size={20} className="cursor-pointer" />
                        ) : (
                            <Eye size={20} className="cursor-pointer" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}