import { Eye, EyeOff, Lock, type LucideIcon } from "lucide-react";
import React, { useState, type InputHTMLAttributes } from "react";

interface InputProps {
    type?: "text" | "password" | "email" | "date" | "number" | "tel" | "url";
    value: string | number;
    onChange: (value: string) => void;
    onEnter?: () => void;
    placeholder: string;
    label?: string;
    classLabel?: string;
    classInput?: string;
    disabled?: boolean;
    required?: boolean;
    iconLeft?: "lock" | React.ReactNode | LucideIcon | undefined;
    iconRight?: "lock" | React.ReactNode | LucideIcon | undefined;
    className?: string;
    bgInput?: string;
    border?: string | undefined;
    min?: string;
    max?: string;
    step?: string;
    classDivIn? : string;
    inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
}

export default function Input({
    type = "text",
    value,
    onChange,
    onEnter,
    placeholder,
    label,
    classLabel = "block text-md font-medium text-gray-700 mb-2", // ✅ Valor padrão
    classDivIn = "",
    classInput = "",
    disabled = false,
    required = false,
    iconLeft,
    iconRight,
    className,
    bgInput = "bg-gray-100",
    min,
    max,
    step,
    inputMode,
    border = "gray-300",
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const currentType = isPassword && showPassword ? "text" : type;
    const renderIcon = (
        icon: "lock" | React.ReactNode | LucideIcon | undefined
    ) => {
        if (icon === "lock") {
            return <Lock size={20} />;
        } else if (React.isValidElement(icon)) {
            return icon;
        } else if (icon) {
            const IconComponent = icon as LucideIcon;
            return <IconComponent size={20} />;
        }
        return null;
    };

    const inputValue = value?.toString() || "";

    return (
        <div className={className ? className : "w-full"}>
            {label && (
                <label className={classLabel}>
                    {" "}
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div
                className={
                    classDivIn +
                    ` flex items-center w-full ${bgInput} border border-${border} rounded-lg transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 px-3 py-2`
                }
            >
                {/* Ícone esquerdo */}
                {renderIcon(iconLeft) && (
                    <div className="mr-2 text-gray-500 shrink-0">
                        {renderIcon(iconLeft)}
                    </div>
                )}

                {/* Input */}
                <input
                    {...(onEnter && {
                        onKeyDown: (
                            e: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                            if (e.key === "Enter" && onEnter) {
                                onEnter();
                            }
                        },
                    })}
                    inputMode={inputMode}
                    onChange={(e) => onChange(e.target.value)}
                    type={currentType}
                    className={
                        classInput +
                        " flex-1 px-1 py-1 w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 disabled:opacity-50"
                    }
                    placeholder={placeholder}
                    required={required}
                    value={inputValue}
                    disabled={disabled}
                    min={min}
                    max={max}
                    step={step}
                />

                {/* Ícone direito */}
                {renderIcon(iconRight) && (
                    <div className="ml-2 text-gray-500 shrink-0">
                        {renderIcon(iconRight)}
                    </div>
                )}

                {/* Botão de mostrar/ocultar senha */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-500 hover:text-gray-700 shrink-0 ml-2"
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
