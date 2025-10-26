import { ChefHat } from "lucide-react";

interface LogoProps {
    className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
    return (
        <div
            className={`flex aspect-square items-center justify-center rounded-[30%] bg-linear-to-br from-primary ${className}`}
        >
            <ChefHat className="h-[55%] w-[55%] shrink-0" />
        </div>
    );
}
