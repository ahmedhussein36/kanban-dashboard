import { Task, TaskColumn } from "@/types/task";
import axios from "axios";

<<<<<<< HEAD
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});
=======
const API_URL =
    // process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000/tasks";
>>>>>>> 1f5e3790332653deba81058bb7a045bab292133f

export const apiClient = {
    async getTasks(column?: string, page = 1, limit = 10) {
        try {
            const params = new URLSearchParams();

            if (column) params.append("column", column);
            params.append("page", String(page));
            params.append("limit", String(limit));

<<<<<<< HEAD
            const response = await api.get(`/tasks?${params.toString()}`);
            return response.data;
=======
            const response = await axios.get(`${API_URL}?${params.toString()}`);

            if (!response) throw new Error("Failed to fetch tasks");

            const tasks = await response.data;
            return tasks;
>>>>>>> 1f5e3790332653deba81058bb7a045bab292133f
        } catch (error) {
            console.error("Error fetching tasks:", error);
            throw error;
        }
    },

    async createTask(data: Omit<Task, "id">) {
        try {
<<<<<<< HEAD
            const res = await api.post(`/tasks`, { ...data, id: Date.now() });
=======
            const res = await axios.post(API_URL, { ...data, id: Date.now() });
            if (!res) throw new Error("Failed to create task");
>>>>>>> 1f5e3790332653deba81058bb7a045bab292133f
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
<<<<<<< HEAD
            const res = await api.put(`/tasks/${id}`, data);
            return res.data;
=======
            const res = await axios.patch(`${API_URL}/${id}`, { ...data });

            if (!res) throw new Error("Failed to update task");

            return await res.data;
>>>>>>> 1f5e3790332653deba81058bb7a045bab292133f
        } catch (error) {
            console.error("Error updating task:", error);
            throw error;
        }
    },

    async deleteTask(id: number) {
        try {
<<<<<<< HEAD
            const res = await api.delete(`/tasks/${id}`);
            return res.data;
=======
            const res = await axios.delete(`${API_URL}/${id}`, {});
            if (!res) throw new Error("Failed to delete task");
>>>>>>> 1f5e3790332653deba81058bb7a045bab292133f
        } catch (error) {
            console.error("Error deleting task:", error);
            throw error;
        }
    },
};

export const getTasks = apiClient.getTasks;
export const createTask = apiClient.createTask;
<<<<<<< HEAD
export const updateTaskStatus = (id: number, status: TaskColumn) =>
    apiClient.updateTask(id, { column: status });
=======
export const updateTaskStatus = (
    id: number,
    status: "backlog" | "in-progress" | "review" | "done"
) => apiClient.updateTask(id, { column: status });
>>>>>>> 1f5e3790332653deba81058bb7a045bab292133f
export const deleteTask = apiClient.deleteTask;
