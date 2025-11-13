"use client";
import Header from "@/components/Header";
import Board from "@/components/Board";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function KanbanPage() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <div className="p-6 max-w-[1440px] mx-auto">
                <Header />
                <main className=" mx-auto px-6 py-8">
                    <Board />
                </main>
            </div>

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
