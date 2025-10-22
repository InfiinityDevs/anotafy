import { ChefHat } from "lucide-react";

interface LogoProps {
    className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
    return (
        <div
            className={`flex aspect-square items-center justify-center rounded-2xl bg-linear-to-br from-primary to-backgound-gray text-white ${className}`}
        >
            <ChefHat className="h-[55%] w-[55%]" />
        </div>
    );
}
