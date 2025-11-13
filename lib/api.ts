import { Task, TaskColumn } from "@/types/task";
import axios from "axios";

const API_URL =
    // process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000/tasks";

export const apiClient = {
    async getTasks(column?: string, page = 1, limit = 10) {
        try {
            const params = new URLSearchParams();

            if (column) params.append("column", column);
            params.append("page", String(page));
            params.append("limit", String(limit));

            const response = await axios.get(`${API_URL}?${params.toString()}`);

            if (!response) throw new Error("Failed to fetch tasks");

            const tasks = await response.data;
            return tasks;
        } catch (error) {
            console.error("Error fetching tasks:", error);
            return [];
        }
    },

    async createTask(data: Omit<Task, "id">) {
        try {
            const res = await axios.post(API_URL, { ...data, id: Date.now() });
            if (!res) throw new Error("Failed to create task");
            return res.data;
        } catch (error) {
            console.error("Error creating task:", error);
            throw new Error("Failed to create task");
        }
    },

    async updateTask(
        id: number,
        data: Partial<{
            title: string;
            description: string;
            column: TaskColumn;
        }>
    ) {
        try {
            const res = await axios.patch(`${API_URL}/${id}`, { ...data });

            if (!res) throw new Error("Failed to update task");

            return await res.data;
        } catch (error) {
            console.error("Error updating task:", error);
            throw new Error("Failed to update task");
        }
    },

    async deleteTask(id: number) {
        try {
            const res = await axios.delete(`${API_URL}/${id}`, {});
            if (!res) throw new Error("Failed to delete task");
        } catch (error) {
            console.error("Error deleting task:", error);
            throw new Error("Failed to delete task");
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
