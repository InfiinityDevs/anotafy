import React from "react";

interface NavigationItemProps {
    icon: string;
    label: string;
    isActive?: boolean;
    onClick?: () => void;
    className?: string;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
    icon,
    label,
    isActive = false,
    onClick,
    className = "",
}) => {
    return (
        <li className={`relative ${className}`}>
            <button
                onClick={onClick}
                className={`
          flex items-center gap-[11px] whitespace-nowrap w-full text-left
          transition-colors duration-200 hover:opacity-80 focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-sm
          ${isActive ? "opacity-100" : "opacity-90"}
        `}
                aria-current={isActive ? "page" : undefined}
            >
                <img
                    src={icon}
                    alt=""
                    className="aspect-[1] object-contain w-3 shrink-0"
                    role="presentation"
                />
                <span>{label}</span>
            </button>
        </li>
    );
};
