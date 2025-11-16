import { Task, TaskColumn } from "@/types/task";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});

export const apiClient = {
    async getTasks(column?: string, page = 1, limit = 10) {
        try {
            const params = new URLSearchParams();

            if (column) params.append("column", column);
            params.append("page", String(page));
            params.append("limit", String(limit));

            const response = await api.get(`/tasks?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching tasks:", error);
            throw error;
        }
    },

    async createTask(data: Omit<Task, "id">) {
        try {
            const res = await api.post(`/tasks`, { ...data, id: Date.now() });
            return res.data;
        } catch (error) {
            console.error("Error creating task:", error);
            throw error;
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
            const res = await api.put(`/tasks/${id}`, data);
            return res.data;
        } catch (error) {
            console.error("Error updating task:", error);
            throw error;
        }
    },

    async deleteTask(id: number) {
        try {
            const res = await api.delete(`/tasks/${id}`);
            return res.data;
        } catch (error) {
            console.error("Error deleting task:", error);
            throw error;
        }
    },
};

export const getTasks = apiClient.getTasks;
export const createTask = apiClient.createTask;
export const updateTaskStatus = (id: number, status: TaskColumn) =>
    apiClient.updateTask(id, { column: status });
export const deleteTask = apiClient.deleteTask;
