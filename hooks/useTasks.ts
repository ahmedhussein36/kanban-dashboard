import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import type { Task, TaskColumn } from "@/types/task";

const LIMIT = 10;

export function useTasks(column?: string) {
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

/* 
I Used optimistic update here to instantly reflect task changes 
in the UI without waiting for the server response, making the 
drag-and-drop feel smoother and more responsive.
*/

export function useUpdateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            id,
            data,
            column,
        }: {
            id: number;
            data: Partial<Task>;
            column: TaskColumn;
        }) => apiClient.updateTask(id, { ...data, column }),

        onMutate: async ({ id, data, column }) => {
            await queryClient.cancelQueries({ queryKey: ["tasks", column] });
            const previousTasks = queryClient.getQueryData<Task[]>([
                "tasks",
                column,
            ]);

            queryClient.setQueriesData(
                { queryKey: ["tasks", column] },
                (old: any) => {
                    if (!old) return old;
                    return {
                        ...old,
                        pages: old.pages.map((page: any[]) =>
                            page.map((task) =>
                                task.id === id ? { ...task, ...data } : task
                            )
                        ),
                    };
                }
            );

            return { previousTasks };
        },

        onError: (error, variables, context) => {
            console.error("Error updating task:", error);
            if (context?.previousTasks) {
                queryClient.setQueryData(
                    ["tasks", variables.column],
                    context.previousTasks
                );
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
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
            throw new Error("Failed to delete task");
        },
    });
}
