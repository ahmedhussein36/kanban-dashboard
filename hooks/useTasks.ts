import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import type { Task, TaskColumn } from "@/types/task";
import { useKanbanStore } from "@/store/useKanbanStore";

const LIMIT = 10;

<<<<<<< HEAD
// get tasks from API --------------------------------------

export function useTasks(column?: string) {
    const searchTerm = useKanbanStore((s) => s.searchTerm);

=======
export function useTasks(column?: string) {
>>>>>>> 1f5e3790332653deba81058bb7a045bab292133f
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 1f5e3790332653deba81058bb7a045bab292133f
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
