"use client";

import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { Column } from "./column";
import { COLUMNS, COLUMN_LABELS, type Task } from "@/types/task";
import { useUpdateTask } from "@/hooks/useTasks";
import { useQueryClient } from "@tanstack/react-query";

export function Board() {
    const updateTask = useUpdateTask();
    const queryClient = useQueryClient();

    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        const taskId = Number(draggableId.split("-")[1]);
        const newColumn = destination.droppableId as Task["column"];

        queryClient.setQueryData(["tasks"], (oldData: any) => {
            if (!oldData) return oldData;
            return {
                ...oldData,
                pages: oldData.pages.map((page: Task[]) =>
                    page.map((t) =>
                        t.id === taskId ? { ...t, column: newColumn } : t
                    )
                ),
            };
        });

        updateTask.mutate({ id: taskId, data: { column: newColumn } });
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-4 gap-4">
                {COLUMNS.map((column) => (
                    <Column
                        key={column}
                        column={column}
                        label={COLUMN_LABELS[column]}
                    />
                ))}
            </div>
        </DragDropContext>
    );
}
