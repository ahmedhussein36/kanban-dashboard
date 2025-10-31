import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import type { Task } from "@/types/task";

export function useUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Task> }) =>
            apiClient.updateTask(id, data),

        onMutate: async ({ id, data }) => {
            await queryClient.cancelQueries({ queryKey: ["tasks"] });
            const previous = queryClient.getQueryData(["tasks"]);

            queryClient.setQueryData(["tasks"], (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: Task[]) =>
                        page.map((t) => (t.id === id ? { ...t, ...data } : t))
                    ),
                };
            });

            return { previous };
        },

        onSettled: () => {
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ["tasks"] });
            }, 1200);
        },

        onError: (err, _, context) => {
            if (context?.previous) {
                queryClient.setQueryData(["tasks"], context.previous);
            }
        },
    });
}
