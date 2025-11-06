"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

interface LabelProps
    extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
    required?: boolean;
}

export function Label({ required, className, ...props }: LabelProps) {
    return (
        <div className="flex items-center gap-1">
            <LabelPrimitive.Root
                data-slot="label"
                className={cn(
                    "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                    className
                )}
                {...props}
            />
            {required && <span className="text-destructive">* </span>}
        </div>
    );
}
