import { create } from "zustand";

interface KanbanStore {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isSearching: boolean;
    setIsSearching: (isSearching: boolean) => void;
}

export const useKanbanStore = create<KanbanStore>((set) => ({
    searchTerm: "",
    setSearchTerm: (term) => set({ searchTerm: term }),
    isSearching: false,
    setIsSearching: (isSearching) => set({ isSearching }),
}));
