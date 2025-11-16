"use client";

import { useState, useEffect, useMemo } from "react";
import {
    DndContext,
    closestCenter,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Column from "./Column";
import TaskCard from "./TaskCard";
import SearchBox from "../SearchBox";
import { AddTaskDialog } from "../TaskDialog";

import { useTasks } from "@/hooks/useTasks";
import {
    COLUMNS,
    COLUMN_LABELS,
    type Task,
    type TaskColumn,
} from "@/types/task";

import { useKanbanStore } from "@/store/useKanbanStore";
import { useKanbanDrag } from "@/hooks/useKanbanDrag";

export default function KanbanBoard() {
    const { data: tasksPages } = useTasks();
    const searchTerm = useKanbanStore((s) => s.searchTerm);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const [columns, setColumns] = useState<Record<TaskColumn, Task[]>>({
        backlog: [],
        inprogress: [],
        review: [],
        done: [],
    });

    // 1) Load tasks into column state (after infinite scroll)
    useEffect(() => {
        if (!tasksPages) return;

        const all = tasksPages.pages.flat() as Task[];

        const grouped = COLUMNS.reduce((acc, col) => {
            acc[col] = all.filter((t) => t.column === col);
            return acc;
        }, {} as Record<TaskColumn, Task[]>);

        setColumns(grouped);
    }, [tasksPages]);

    // 2) Apply SEARCH FILTER on all columns
    const filteredColumns = useMemo(() => {
        if (!searchTerm) return columns;
        const lower = searchTerm.toLowerCase();

        return COLUMNS.reduce((acc, col) => {
            acc[col] = columns[col].filter((task) => {
                const titleMatches = task.title.toLowerCase().includes(lower);
                const descMatches = task.description
                    ? task.description.toLowerCase().includes(lower)
                    : false;
                return titleMatches || descMatches;
            });
            return acc;
        }, {} as Record<TaskColumn, Task[]>);
    }, [searchTerm, columns]);

    const {
        activeTask,
        overingTaskId,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
    } = useKanbanDrag(columns, setColumns);

    return (
        <div className="flex flex-col space-y-2 h-full">
            <div className="flex justify-between items-center">
                <SearchBox />
                <AddTaskDialog />
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-4 gap-4 p-4">
                    {COLUMNS.map((col) => (
                        <SortableContext
                            key={col}
                            items={filteredColumns[col].map((t) => t.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <Column
                                column={col}
                                label={COLUMN_LABELS[col]}
                                tasks={filteredColumns[col]}
                                overingTaskId={overingTaskId}
                            />
                        </SortableContext>
                    ))}
                </div>

                <DragOverlay>
                    {activeTask && <TaskCard task={activeTask} overlay />}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
