"use client";

import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SideBarProps {
    items: ItemSideBarProps[];
}

export default function SideBar({ items }: SideBarProps) {
    const pathname = usePathname();
    const activeId =
        pathname === "/" ? "dashboard" : pathname.split("/")[1] || "dashboard";

    return (
        <nav className="w-full flex flex-col gap-1 p-4 bg-white h-full border-r border-gray-200 shadow-sm">
            <div className="mb-4 px-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Menu Principal
                </h3>
            </div>

            <div className="flex flex-col gap-1">
                {items.map((item) => {
                    const isActive =
                        activeId === item.id ||
                        pathname.startsWith(`/${item.id}/`);
                    return (
                        <ItemSideBar
                            id={item.id}
                            key={String(item.children)}
                            icon={item.icon}
                            className="w-full transition-all duration-200"
                            variant={isActive ? "default" : "ghost"}
                            isActive={isActive}
                        >
                            {item.children}
                        </ItemSideBar>
                    );
                })}
            </div>

            {/* Espaço para informações adicionais */}
            <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="px-3 py-2 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-700 font-medium">
                        Restaurante Ativo
                    </p>
                    <p className="text-xs text-blue-600">8h - 23h</p>
                </div>
            </div>
        </nav>
    );
}

export interface ItemSideBarProps {
    icon: LucideIcon;
    children: ReactNode;
    id: string;
    variant?: "ghost" | "default";
    className?: string;
    isActive?: boolean;
}

function ItemSideBar({
    icon,
    children,
    variant = "ghost",
    id,
    className,
    isActive = false,
}: ItemSideBarProps) {
    const Icon = icon;

    return (
        <Link href={"/" + id}>
            <button
                className={cn(
                    "rounded-lg px-3 py-2 cursor-pointer text-start transition-all duration-200 group",
                    "hover:translate-x-1 hover:shadow-sm",
                    variant === "ghost"
                        ? `hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-transparent hover:border-gray-200`
                        : `bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-md border border-blue-500`,
                    isActive && "ring-2 ring-blue-200 ring-inset",
                    className
                )}
            >
                <div className="flex flex-row items-center">
                    <div
                        className={cn(
                            "p-1.5 rounded-md mr-3 transition-all duration-200",
                            variant === "default"
                                ? "bg-white/20"
                                : "bg-gray-100 group-hover:bg-blue-100"
                        )}
                    >
                        {Icon && (
                            <Icon
                                className={cn(
                                    "transition-colors duration-200",
                                    variant === "default"
                                        ? "text-white"
                                        : "text-gray-600 group-hover:text-blue-600"
                                )}
                                size={18}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                        )}
                    </div>
                    <span
                        className={cn(
                            "font-medium transition-all duration-200",
                            variant === "default"
                                ? "text-white"
                                : "text-gray-700 group-hover:text-gray-900",
                            isActive && "font-semibold"
                        )}
                    >
                        {children}
                    </span>
                    {/* Indicador de página ativa */}
                    {isActive && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
                </div>
            </button>
        </Link>
    );
}
