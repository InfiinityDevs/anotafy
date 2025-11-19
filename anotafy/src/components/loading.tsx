import Overflow from "@/components/ui/overflow";
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

const Shimmer = ({ className = "" }: { className?: string }) => (
    <div
        className={cn(
            "animate-pulse rounded-md bg-slate-200/80 dark:bg-slate-800/60",
            className
        )}
    />
);

export default function LoadingServer({ children }: { children: React.ReactNode }) {
        return <Suspense fallback={<ComponentLoading />}>
            {children}
        </Suspense>;
}

function ComponentLoading() {
    const cards = Array.from({ length: 3 });
    const rows = Array.from({ length: 6 });

    return (
        <Overflow>
            <div className="p-4 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Shimmer className="h-8 w-48" />
                    <Shimmer className="h-4 w-72" />
                </div>

                <div className="flex w-full flex-wrap gap-4">
                    {cards.map((_, index) => (
                        <Card
                            key={`card-skeleton-${index}`}
                            className="flex-1 min-w-[180px] p-4 border border-gray-200 bg-white"
                        >
                            <div className="flex items-center justify-between">
                                <Shimmer className="h-4 w-28" />
                                <Shimmer className="h-5 w-5 rounded-full" />
                            </div>
                            <div className="mt-4 space-y-2">
                                <Shimmer className="h-8 w-24" />
                                <Shimmer className="h-4 w-16" />
                            </div>
                        </Card>
                    ))}
                </div>

                <Card className="p-4">
                    <div className="flex flex-row gap-2 w-full">
                        <div className="w-full">
                            <Shimmer className="h-10 w-full" />
                        </div>
                        <Shimmer className="h-10 w-24" />
                        <Shimmer className="h-10 w-32" />
                    </div>

                    <div className="w-full mt-4 p-0 overflow-hidden border shadow rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    {Array.from({ length: 5 }).map(
                                        (_, headIndex) => (
                                            <TableHead
                                                key={`head-${headIndex}`}
                                            >
                                                <Shimmer className="h-4 w-24" />
                                            </TableHead>
                                        )
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((_, rowIndex) => (
                                    <TableRow
                                        key={`row-${rowIndex}`}
                                        className="hover:bg-transparent"
                                    >
                                        {Array.from({ length: 5 }).map(
                                            (_, cellIndex) => (
                                                <TableCell
                                                    key={`cell-${rowIndex}-${cellIndex}`}
                                                    className="py-4"
                                                >
                                                    <Shimmer className="h-4 w-20" />
                                                </TableCell>
                                            )
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            </div>
        </Overflow>
    );
}
