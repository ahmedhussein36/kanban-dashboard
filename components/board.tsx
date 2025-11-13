"use client";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { Column } from "./Column";
import { COLUMNS, COLUMN_LABELS, TaskColumn } from "@/types/task";
import { useUpdateTask } from "@/hooks/useTasks";

export default function Board() {
    const updateTask = useUpdateTask();

    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const taskId = parseInt(draggableId);
        const newColumn = destination.droppableId as TaskColumn;

        updateTask.mutateAsync({
            id: taskId,
            data: { column: newColumn },
            column: newColumn,
        });
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-4 gap-4  min-w-[800px] ">
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
