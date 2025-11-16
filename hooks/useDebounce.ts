import { useEffect, useState } from "react";

interface DebounceResult {
    debouncedValue: string;
    isLoading: boolean;
}

export function useDebounce(
    value: string,
    delay: number = 500
): DebounceResult {
    const [debouncedValue, setDebouncedValue] = useState<string>(value);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (value!== "") setIsLoading(true);

        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
            setIsLoading(false);
        };
    }, [value, delay]);

    return {
        debouncedValue,
        isLoading,
    };
}
