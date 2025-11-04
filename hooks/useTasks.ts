import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import type { Task, TaskColumn } from "@/types/task";

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
            oldColumn,
            data,
        }: {
            id: number | string;
            oldColumn: string;
            data: Partial<Task>;
        }) => {
            let oldTask: null | Task = null;
            queryClient.setQueryData(
                ["tasks", oldColumn],
                (oldData: { pages: any[] }) => {
                    oldTask = oldData.pages
                        .flat()
                        .find(
                            (task: { id: string }) => task.id === id.toString()
                        );
                    const oldDataUpdate = {
                        ...oldData,
                        pages: oldData.pages.map((tasks: any[]) =>
                            tasks.filter(
                                (task: { id: string }) =>
                                    task.id !== id.toString()
                            )
                        ),
                    };
                    // console.log("oldDataUpdate", oldDataUpdate);
                    return oldDataUpdate;
                }
            );
            queryClient.setQueryData(
                ["tasks", data.column],
                (oldData: { pages: any[] }) => {
                    console.log("oldTask", oldTask);
                    const newUpdatedData = {
                        ...oldData,
                        pages: oldData.pages.map((tasks: any, index: number) =>
                            index + 1 === oldData.pages.length
                                ? [
                                      ...tasks,
                                      { ...oldTask, column: data.column },
                                  ]
                                : tasks
                        ),
                    };
                    return newUpdatedData;
                }
            );
            return Promise.resolve({ id, column: data.column });
        },
        onSuccess: async (data) => {
            await apiClient.updateTask(String(data.id), data);
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onError: (error) => {
            console.error("Error updating task:", error);
            throw new Error("Failed to update task");
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
