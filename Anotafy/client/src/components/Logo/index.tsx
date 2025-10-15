import { ChefHat } from "lucide-react";

interface LogoProps{
    size: number;
    className?: string;
}

export default function Logo({ size, className = '' }: LogoProps) {
    const pai = size * 0.25 + "rem";
    const filho = (size * 0.25) * 0.55 + "rem";

    return (
        <div
            className={`flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary text-white ${className}`}
            style={{
                width: pai,
                height: pai,
            }}
        >
            <ChefHat style={{height : filho, width: filho}}/>
        </div>
    );
}
