import { create } from "zustand";

interface KanbanStore {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    dragState: {
        isDragging: boolean; 
        sourceColumn?: string;
    };
    setDragState: (state: {
        isDragging: boolean;
        sourceColumn?: string;
    }) => void;
}

export const useKanbanStore = create<KanbanStore>((set) => ({
    searchTerm: "",
    setSearchTerm: (term) => set({ searchTerm: term }),
    dragState: { isDragging: false },
    setDragState: (state) => set({ dragState: state }),
}));
