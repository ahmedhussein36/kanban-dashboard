"use client";

import { useState } from "react";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { Task, TaskColumn } from "@/types/task";
import { useUpdateTask } from "./useTasks";
import { arrayMove } from "@dnd-kit/sortable";

export function useKanbanDrag(
    columns: Record<TaskColumn, Task[]>,
    setColumns: React.Dispatch<React.SetStateAction<Record<TaskColumn, Task[]>>>
) {
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [overId, setOverId] = useState<number | null>(null);
    const [overingTaskId, setOveringTaskId] = useState<number | null>(null);
    const updateTask = useUpdateTask();

    const handleDragStart = (event: DragStartEvent) => {
        const task = event.active.data.current as Task;
        setActiveTask(task);
    };

    const handleDragOver = (event: any) => {
        const { over } = event;
        if (!over) {
            setOveringTaskId(null);
            return;
        }

        const overData = over.data.current;
        if (overData?.type === "column") {
            setOveringTaskId(null);
        } else {
            setOveringTaskId(over.id as number);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveTask(null);
        setOveringTaskId(null);
        if (!over) return;

        const activeId = active.id as number;
        const activeColumn = (active?.data?.current?.column ||
            "backlog") as TaskColumn;

        // Determine if dropping on a column or a task
        const overData = over.data.current;
        let overColumn: TaskColumn = activeColumn;
        let overTaskId: number | null = null;

        // Check if dropping on a column directly (for empty columns)
        if (overData?.type === "column") {
            overColumn = overData.column as TaskColumn;
        } else {
            // Dropping on a task - find which column it belongs to
            overTaskId = over.id as number;
            for (const col in columns) {
                if (
                    columns[col as TaskColumn].some((t) => t.id === overTaskId)
                ) {
                    overColumn = col as TaskColumn;
                    break;
                }
            }
        }

        setOverId(overTaskId);

        const activeList = [...columns[activeColumn]];
        const overList = [...columns[overColumn]];

        const oldIndex = activeList.findIndex((t) => t.id === activeId);
        let newIndex = overTaskId
            ? overList.findIndex((t) => t.id === overTaskId)
            : overList.length;

        const moved = activeList[oldIndex];
        moved.column = overColumn;

        if (activeColumn === overColumn) {
            // Reorder within same column
            setColumns((prev) => ({
                ...prev,
                [activeColumn]: arrayMove(
                    activeList,
                    oldIndex,
                    newIndex === -1 ? overList.length : newIndex
                ),
            }));
        } else {
            // Move between columns
            activeList.splice(oldIndex, 1);
            overList.splice(
                newIndex === -1 ? overList.length : newIndex,
                0,
                moved
            );
            setColumns((prev) => ({
                ...prev,
                [activeColumn]: activeList,
                [overColumn]: overList,
            }));
        }

        updateTask.mutate({
            id: activeId,
            data: { column: overColumn },
            column: overColumn,
        });
    };

    return {
        activeTask,
        overId,
        overingTaskId,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
    };
}
