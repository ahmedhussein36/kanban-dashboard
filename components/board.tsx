import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { Column } from "./Column";
import { COLUMNS, COLUMN_LABELS, Task } from "@/types/task";
import { useUpdateTask } from "@/hooks/useTasks";
import { queryClient } from "@/lib/query-client";
import { useState } from "react";

export default function Board() {
    const updateTask = useUpdateTask();

    const handleDragStart = () => {
        // Optional: Add any logic needed when dragging starts
    };

    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        // console.log(source);
        const taskId = Number.parseInt(draggableId.split("-")[1], 10);
        const newColumn = destination.droppableId as
            | "backlog"
            | "in-progress"
            | "review"
            | "done";

        updateTask.mutate({
            id: taskId,
            oldColumn: source.droppableId,
            data: { column: newColumn },
        });
    };

    return (
        <DragDropContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
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
