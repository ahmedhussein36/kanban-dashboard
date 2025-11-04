"use client";
import { useKanbanStore } from "@/store/useKanbanStore";
import Header from "@/components/Header";
import Board from "@/components/Board";
export default function KanbanPage() {

    return (
        <div className="min-h-full bg-background flex flex-col flex-1 py-6">
            <Header />
            <main className="max-w-7xl mx-auto px-6 py-8">
                <Board />
            </main>
        </div>
    );
}
