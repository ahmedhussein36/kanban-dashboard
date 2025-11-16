"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/types/task";
import { Card } from "../ui/card";
import { TaskUpdateDialog } from "../TaskUpdateDialog";
import { DeleteTaskAlert } from "../DeletetaskAlert";
import { useDeleteTask } from "@/hooks/useTasks";

interface TaskCardProps {
    task: Task;
    overlay?: boolean;
    isOver?: boolean;
}

export default function TaskCard({
    task,
    overlay = false,
    isOver = false,
}: TaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: { ...task },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: overlay ? 1 : isDragging ? 0 : 1,
        cursor: overlay ? "grabbing" : "grab",
    };

    const deleteTask = useDeleteTask();

    const taskStatus = (column: string) => {
        switch (column) {
            case "backlog":
                return {
                    badge: "bg-gray-100 text-gray-800",
                    badgeLabel: "TO-do",
                };
            case "inprogress":
                return {
                    badge: "bg-blue-100 text-blue-800",
                    badgeLabel: "Progress",
                };
            case "review":
                return {
                    badge: "bg-yellow-100 text-yellow-800",
                    badgeLabel: "Reviewing",
                };
            case "done":
                return {
                    badge: "bg-lime-200 text-green-800",
                    badgeLabel: "Completed",
                };
            default:
                return {
                    badge: "bg-gray-100 text-gray-800",
                    badgeLabel: "Unknown",
                };
        }
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card
                className={`p-3 w-full transition-all duration-200 
                    ${
                        isOver&& "mt-28"
                    }
                    ${
                        overlay
                            ? "bg-teal-50 border-teal-500 rotate-[5deg]"
                            : "bg-white border"
                    }`}
            >
                <div className="flex flex-col gap-3">
                    <span
                        className={`w-max text-xs font-medium px-2 py-1 rounded-full ${
                            taskStatus(task?.column).badge
                        } `}
                    >
                        {taskStatus(task?.column).badgeLabel}
                    </span>

                    <div className="flex flex-col gap-1">
                        <h3 className="font-medium text-sm">{task.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                            {task.description}
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 mt-1">
                        <TaskUpdateDialog task={task} />

                        <DeleteTaskAlert
                            onDelete={() => deleteTask.mutate(task.id)}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
}
