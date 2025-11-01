import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { Column } from "./column";
import { COLUMNS, COLUMN_LABELS } from "@/types/task";
import { useUpdateTask } from "@/hooks/useTasks";

export function Board() {
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

        const taskId = Number.parseInt(draggableId.split("-")[1], 10);
        const newColumn = destination.droppableId as
            | "backlog"
            | "in-progress"
            | "review"
            | "done";

        updateTask.mutate({
            id: taskId,
            data: { column: newColumn },
        });
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
