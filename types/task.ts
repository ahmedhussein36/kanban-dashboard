export interface Task {
    id: number;
    title: string;
    description: string;
    column: "backlog" | "in-progress" | "review" | "done";
    order?: number;
}

export type TaskColumn = Task["column"];

export const COLUMNS: TaskColumn[] = [
    "backlog",
    "in-progress",
    "review",
    "done",
];

export const COLUMN_LABELS: Record<TaskColumn, string> = {
    backlog: "Backlog",
    "in-progress": "In Progress",
    review: "Review",
    done: "Done",
};

export interface UpdateTaskVariables {
    id: number | string;
    oldColumn: string;
    data: Partial<Task>;
}

export interface TaskCache {
    pages: Task[][];
}
