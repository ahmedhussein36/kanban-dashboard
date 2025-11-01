import { Task } from "@/types/task";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/tasks";

export const apiClient = {
    async getTasks(column?: string, page = 1, limit = 10) {
        try {
            const params = new URLSearchParams();

            if (column) params.append("column", column);
            params.append("page", String(page));
            params.append("limit", String(limit));

            const response = await fetch(`${API_URL}?${params.toString()}`);

            if (!response.ok) throw new Error("Failed to fetch tasks");

            const tasks = await response.json();
            return tasks;
        } catch (error) {
            console.error("Error fetching tasks:", error);
            return [];
        }
    },

    async createTask(data: Omit<Task, "id" | "createdAt">) {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    createdAt: new Date().toISOString(),
                }),
            });
            if (!res.ok) throw new Error("Failed to create task");
            return res.json();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    },

    async updateTask(
        id: string,
        data: Partial<{ title: string; description: string; column: string }>
    ) {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Failed to update task");
            const updated = await res.json();
            return updated;
        } catch (error) {
            console.error("Error updating task:", error);
        }
    },
    async deleteTask(id: number) {
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete task");
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    },
};

export const getTasks = apiClient.getTasks;
export const createTask = apiClient.createTask;
export const updateTaskStatus = (
    id: number,
    status: "backlog" | "in-progress" | "review" | "done"
) => apiClient.updateTask(id.toString(), { column: status });
export const deleteTask = apiClient.deleteTask;
