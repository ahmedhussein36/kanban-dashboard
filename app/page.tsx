"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Board } from "@/components/board";
import { TaskDialog } from "@/components/task-dialog";
import { Search } from "lucide-react";
import { useKanbanStore } from "@/store/useKanbanStore";
import { queryClient } from "@/lib/query-client";
import Image from "next/image";

export default function KanbanPage() {
    const { searchTerm, setSearchTerm } = useKanbanStore();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-full bg-background flex flex-col flex-1 py-6">
                <header className="border-b sticky top-0 bg-background/95 backdrop-blur">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Image
                                    src="/logo.svg"
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                />
                                <h1 className="text-2xl font-bold">
                                    Kanban Board
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1 max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                <Input
                                    placeholder="Search tasks..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-9"
                                />
                            </div>
                            <TaskDialog />
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-6 py-8">
                    <Board />
                </main>
            </div>
        </QueryClientProvider>
    );
}
