"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteTask } from "@/hooks/useTasks";
import { Task } from "@/types/task";
import { TaskUpdateDialog } from "./task-update-dialog";
import { DeleteTaskAlert } from "./DeletetaskAlert";

interface TaskCardProps {
    task: Task;
    index: number;
}

export function TaskCard({ task, index }: TaskCardProps) {
    const deleteTask = useDeleteTask();
    const taskStatus = (column: string) => {
        switch (column) {
            case "backlog":
                return {
                    label: "To Do",
                    color: "bg-indigo-100 text-indigo-800",
                };
            case "in-progress":
                return {
                    label: "In Progress",
                    color: "bg-teal-100 text-teal-800",
                };
            case "review":
                return {
                    label: "Reviewing",
                    color: "bg-amber-100 text-amber-800",
                };
            case "done":
                return {
                    label: "Completed",
                    color: "bg-lime-100 text-green-600",
                };
            default:
                return { label: "Unknown", color: "bg-gray-100 text-gray-800" };
        }
    };

    return (
        <Draggable draggableId={`task-${task.id}`} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-3"
                >
                    <Card
                        className={`p-3 cursor-move transition-all ${
                            snapshot.isDragging
                                ? "shadow-lg scale-105 bg-teal-50 border border-teal-300"
                                : "hover:shadow-md"
                        }`}
                    >
                        <div className="flex flex-col items-start justify-start gap-2">
                            <div className="w-full">
                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded-full 
                                        ${taskStatus(task.column).color}`}
                                >
                                    {taskStatus(task.column).label}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0 my-2 ">
                                <h3 className="font-medium text-sm truncate">
                                    {task.title}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                    {task.description}
                                </p>
                            </div>
                            <div className="flex justify-end items-center gap-4 w-full">
                                <TaskUpdateDialog task={task} />
                                <DeleteTaskAlert
                                    onDelete={() =>
                                        deleteTask.mutate(Number(task.id))
                                    }
                                    trigger={
                                        <Button
                                            variant="default"
                                            size="icon-lg"
                                            aria-label="delete-task"
                                            title="Delete task"
                                            className="cursor-pointer h-8 w-8 p-0 bg-rose-100 hover:bg-rose-200/70 text-rose-600 hover:text-rose-700"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    }
                                />
                               
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </Draggable>
    );
}
