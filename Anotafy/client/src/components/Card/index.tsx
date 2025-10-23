import type React from "react";
import type { ReactNode } from "react";

interface CardMesaProps {
    children?: ReactNode;
    bgColor?: React.CSSProperties["backgroundColor"];
    W?: [number, number]; // [min, max] em rem
    H?: [number, number];
    className?: string;
}

export default function Card({
    children,
    bgColor = "bg-primary",
    W = [44, 72],
    H = [44, 44],
    className,
}: CardMesaProps) {
    const [minW, maxW] = W;
    const [minH, maxH] = H;

    return (
        <div
            className={`rounded-xl p-4 ${bgColor} ${className}`}
            style={{
                minWidth: `${minW * 4}px`, // 44rem * 4 = 176px
                maxWidth: `${maxW * 4}px`, // 72rem * 4 = 288px
                minHeight: `${minH * 4}px`,
                maxHeight: `${maxH * 4}px`,
            }}
        >
            {children}
        </div>
    );
}
