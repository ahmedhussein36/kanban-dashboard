import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import type { Task, TaskColumn } from "@/types/task";
import { useKanbanStore } from "@/store/useKanbanStore";

const LIMIT = 10;

// get tasks from API --------------------------------------

export function useTasks(column?: string) {
    const searchTerm = useKanbanStore((s) => s.searchTerm);

    return useInfiniteQuery({
        queryKey: ["tasks", column],
        queryFn: ({ pageParam = 1 }) =>
            apiClient.getTasks(searchTerm, pageParam, LIMIT),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length === LIMIT ? allPages.length + 1 : undefined,
        initialPageParam: 1,
    });
}
// End of get tasks from API ------------------------------

// Create Task Mutation -----------------------------------

export function useCreateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: {
            title: string;
            description: string;
            column: "backlog" | "inprogress" | "review" | "done";
        }) => apiClient.createTask({...data}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onError: (error) => {
            console.error("Error creating task:", error);
            throw new Error("Failed to create task");
        },
    });
}
// End of Create Task mutation ----------------------------

/* 
I Used optimistic update here to instantly reflect task changes 
in the UI without waiting for the server response, making the 
drag-and-drop feel smoother and more responsive.
*/

// Update Task Mutation -----------------------------------

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
            const previous = queryClient.getQueriesData({
                queryKey: ["tasks"],
            });

            await queryClient.cancelQueries({ queryKey: ["tasks"] });

            queryClient.setQueriesData({ queryKey: ["tasks"] }, (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    pages: old.pages.map((page: Task[]) =>
                        page.map((task) =>
                            task.id === id ? { ...task, ...data, column } : task
                        )
                    ),
                };
            });

            return { previous };
        },

        onError: (error, _, context) => {
            console.error("Update error:", error);

            if (context?.previous) {
                for (const [key, data] of context.previous) {
                    queryClient.setQueryData(key, data);
                }
            }
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
}
// End of Update Task mutation----------------------------

// Delete Task -----------------------------------
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
// End of Delete Task -----------------------------------
