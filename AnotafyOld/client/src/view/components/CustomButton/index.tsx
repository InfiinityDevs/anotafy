import type { LucideIcon } from "lucide-react";
import React from "react";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string | React.ReactNode;
    position?: "left" | "right" | "center";
    sizeLabel?:
        | "xs"
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "2xl"
        | "3xl"
        | "4xl"
        | "5xl";
    iconLeft?: React.ReactNode | LucideIcon;
    iconRight?: React.ReactNode | LucideIcon;
    onClick: () => void;
    className?: string;
    bgColor?: string;
    textColor?: string;
}

export default function CustomButton({label, sizeLabel, iconLeft, iconRight, position = "center", onClick, className, bgColor = "bg-primary", textColor = "text-white"}: CustomButtonProps) {
    const renderIcon = (icon: React.ReactNode | LucideIcon) => {
        if (React.isValidElement(icon)) {
            return icon;
        } else if (icon) {
            const IconComponent = icon as LucideIcon;
            return <IconComponent size={20} />;
        }
        return null;
    };

    return (
        <button
            className={`flex flex-row gap-2 justify-${position} items-center ${bgColor} p-3 rounded-lg ${textColor} cursor-pointer ${sizeLabel && `text-${sizeLabel}`} ` + className} onClick={onClick}
        >
            {renderIcon(iconLeft) && renderIcon(iconLeft)}
            {typeof label === "string" ? <span>{label}</span> : label}
            {renderIcon(iconRight) && renderIcon(iconRight)}
        </button>
    );
}
