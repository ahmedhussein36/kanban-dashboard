import { Task } from "@/types/task";
import { toast } from "sonner";

const API_URL = process.env.API_URL || "http://localhost:4000/tasks";

export const apiClient = {
    async getTasks(column?: string, page = 1, limit = 10) {
        try {
            const params = new URLSearchParams({
                ...(column ? { column } : {}),
                _page: String(page),
                _limit: String(limit),
            });

            const response = await fetch(`${API_URL}?${params}`);
            if (!response.ok) throw new Error("Failed to fetch tasks");

            const tasks = await response.json();
            return tasks;
        } catch (error) {
            console.log("Falling back to mock:", error);
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
            toast.error("Failed to create task");
            console.log(error);
        }
    },

    async updateTask(id: number, data: Partial<Task>) {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Failed to update task");
            return res.json();
        } catch (error) {
            toast.error("Failed to update task ");
            console.log(error);
        }
    },

    async deleteTask(id: number) {
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete task");
        } catch (error) {
            toast.error("Failed to delete task");
            console.log(error);
        }
    },
};

export const getTasks = apiClient.getTasks;
export const createTask = apiClient.createTask;
export const updateTaskStatus = (
    id: number,
    status: "backlog" | "in-progress" | "review" | "done"
) => apiClient.updateTask(id, { column: status });
export const deleteTask = apiClient.deleteTask;
