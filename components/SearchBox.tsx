"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { useKanbanStore } from "@/store/useKanbanStore";
import { LoaderCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

const SearchBox = () => {
    const [inputValue, setInputValue] = useState("");
    const { setSearchTerm, setIsSearching } = useKanbanStore();
    const { debouncedValue, isLoading } = useDebounce(inputValue, 500);

    useEffect(() => {
        setSearchTerm(debouncedValue);
        setIsSearching(isLoading);

        return;
    }, [debouncedValue, isLoading, setSearchTerm, setIsSearching]);

    return (
        <div className="relative flex-1 max-w-md min-w-1/2">
            {isLoading ? (
                <LoaderCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
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
    );
};

export default SearchBox;
