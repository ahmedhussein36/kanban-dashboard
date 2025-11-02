"use client";
import { Board } from "@/components/board";
import { useKanbanStore } from "@/store/useKanbanStore";
import Header from "@/components/Header";

export default function KanbanPage() {
    const { searchTerm, setSearchTerm } = useKanbanStore();

    return (
        <div className="min-h-full bg-background flex flex-col flex-1 py-6">
            <Header />
            <main className="max-w-7xl mx-auto px-6 py-8">
                <Board />
            </main>
        </div>
    );
}
