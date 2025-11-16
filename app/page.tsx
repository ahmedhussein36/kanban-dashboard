"use client";
import Header from "@/components/Header";
import Board from "@/components/Board";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import KanbanBoard from "@/components/board/KanbanBoard";
export default function KanbanPage() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <div className="p-3 max-w-[1440px] mx-auto">
                <Header />
                <main className=" mx-auto p-4">
                    <KanbanBoard />
                </main>
            </div>

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
