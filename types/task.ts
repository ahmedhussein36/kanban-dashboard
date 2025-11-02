export interface Task {
    id: number | string;
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
