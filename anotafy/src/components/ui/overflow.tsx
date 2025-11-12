import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Overflow({children, className = ""}: {children: ReactNode, className?: string}) {
    return (
        <div className={cn("flex-1 min-h-0", className)}>
            <div className="h-full overflow-y-auto">
                {children}
            </div>
        </div>
    );
}