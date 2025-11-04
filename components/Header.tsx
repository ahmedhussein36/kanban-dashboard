"use client";
import { useState, useEffect } from "react";
import { useKanbanStore } from "@/store/useKanbanStore";
import AppLogo from "./AppLogo";
import { Search, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { TaskDialog } from "./TaskDialog";

const Header = () => {
    const [inputValue, setInputValue] = useState("");
    const { setSearchTerm, setIsSearching } = useKanbanStore();
    const { debouncedValue, isLoading } = useDebounce(inputValue, 500);

    useEffect(() => {
        setSearchTerm(debouncedValue);
        setIsSearching(isLoading);
    }, [debouncedValue, isLoading, setSearchTerm, setIsSearching]);

    return (
        <header className="border-b sticky top-0 bg-background/95 backdrop-blur">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
                <AppLogo />
                <div className="flex items-center gap-3">
                    <div className="relative flex-1 max-w-xs">
                        {isLoading ? (
                            <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
                        ) : (
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        )}
                        <Input
                            placeholder="Search tasks..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <TaskDialog />
                </div>
            </div>
        </header>
    );
};

export default Header;
