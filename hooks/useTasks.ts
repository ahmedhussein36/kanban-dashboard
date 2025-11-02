import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import type { Task } from "@/types/task";

const LIMIT = 10;

export function useTasks(column: string) {
    return useInfiniteQuery({
        queryKey: ["tasks", column],
        queryFn: ({ pageParam = 1 }) =>
            apiClient.getTasks(column, pageParam, LIMIT),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length === LIMIT ? allPages.length + 1 : undefined,
        initialPageParam: 1,
    });
}

export function useCreateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: {
            title: string;
            description: string;
            column: "backlog" | "in-progress" | "review" | "done";
        }) => apiClient.createTask(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onError: (error) => {
            console.error("Error creating task:", error);
            throw new Error("Failed to create task");
        },
    });
}

export function useUpdateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number | string;
            data: Partial<Task>;
        }) => apiClient.updateTask(String(id), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onError: (error) => {
            console.error("Error updating task:", error);
        },
    });
}

export function useDeleteTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => apiClient.deleteTask(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onError: (error) => {
            console.error("Error deleting task:", error);
        },
    });
}
