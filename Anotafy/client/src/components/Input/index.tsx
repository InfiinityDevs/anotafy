import { Eye, EyeOff, Lock, type LucideIcon } from "lucide-react";
import React, { useState } from "react";

interface InputProps {
    type?: "text" | "password" | "email";
    value: string;
    onChange: (value: string) => void;
    onEnter?: () => void;
    placeholder: string;
    label?: string | undefined;
    disabled?: boolean;
    required?: boolean;
    iconLeft?: "lock" | React.ReactNode | LucideIcon | undefined;
    iconRight?: "lock" | React.ReactNode | LucideIcon | undefined;
    className?: string;
    bgInput?: string;
}

export default function Input({
    type = "text",
    value,
    onChange,
    onEnter,
    placeholder,
    label,
    disabled = false,
    required = false,
    iconLeft,
    iconRight,
    className,
    bgInput = "bg-gray-100",
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

    return (
        <div className={className ? className : "w-full"}>
            {label && (
                <label className="block text-md font-medium text-gray-500 mb-2">
                    {label}
                </label>
            )}
            <div className={ `flex items-center w-full ${bgInput} border border-gray-300 rounded-lg transition-all focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 px-2.5` }>
                {/* Ícone esquerdo */}
                {renderIcon(iconLeft) && (
                    <div className="mr-2 text-gray-500">
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
                    onChange={(e) => onChange(e.target.value)}
                    type={currentType}
                    className="px-2 py-3 w-full bg-transparent border-none outline-none rounded-lg text-gray-500"
                    placeholder={placeholder}
                    required={required}
                    value={value}
                    disabled={disabled}
                />
                {/* Ícone direito */}
                {renderIcon(iconRight) && (
                    <div className="ml-2 text-gray-500">
                        {renderIcon(iconRight)}
                    </div>
                )}

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
