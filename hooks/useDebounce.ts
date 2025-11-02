import { useEffect, useState } from "react";

interface DebounceResult<T> {
    debouncedValue: T;
    isLoading: boolean;
}

export function useDebounce<T>(
    value: T,
    delay: number = 500
): DebounceResult<T> {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);

        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return {
        debouncedValue,
        isLoading,
    };
}
