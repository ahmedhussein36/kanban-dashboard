"use client";
import Header from "@/components/Header";
import Board from "@/components/Board";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
<<<<<<< HEAD
import KanbanBoard from "@/components/board/KanbanBoard";
=======
>>>>>>> 1f5e3790332653deba81058bb7a045bab292133f
export default function KanbanPage() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
            <div className="p-3 max-w-[1440px] mx-auto">
                <Header />
                <main className=" mx-auto p-4">
                    <KanbanBoard />
=======
            <div className="p-6 max-w-[1440px] mx-auto">
                <Header />
                <main className=" mx-auto px-6 py-8">
                    <Board />
>>>>>>> 1f5e3790332653deba81058bb7a045bab292133f
                </main>
            </div>

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
