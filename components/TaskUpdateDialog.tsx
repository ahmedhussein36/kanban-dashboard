"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { COLUMNS, COLUMN_LABELS } from "@/types/task";
import type { Task, TaskColumn } from "@/types/task";
import { useToast } from "@/hooks/use-toast";
import { useUpdateTask } from "@/hooks/useTasks";

interface TaskUpdateDialogProps {
    task: Task;
}

export function TaskUpdateDialog({ task }: TaskUpdateDialogProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [column, setColumn] = useState<TaskColumn>(task.column);

    const updateTask = useUpdateTask();
    const { toast } = useToast();

    const handleUpdate = async () => {
        if (!title.trim()) return;

        updateTask.mutateAsync(
            {
                id: task.id,
                data: { title, description, column },
                column: task.column,
            },
            {
                onSuccess: () => {
                    toast({
                        variant: "default",
                        title: "Task updated",
                        description: `Task has been updated successfully.`,
                    });
                    setOpen(false);
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    size="icon-lg"
                    aria-label="edit-task"
                    title="Edit task"
                    className=" cursor-pointer bg-slate-100 hover:bg-slate-300 text-slate-500 hover:text-slate-700 h-8 w-8 p-0"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                        Add a new task to your Kanban board
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            placeholder="Task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">
                            Description
                        </label>
                        <Textarea
                            placeholder="Task description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Column</label>
                        <Select
                            value={column}
                            onValueChange={(v) => setColumn(v as TaskColumn)}
                        >
                            <SelectTrigger className="mt-1">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {COLUMNS.map((col) => (
                                    <SelectItem key={col} value={col}>
                                        {COLUMN_LABELS[col]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-2 justify-end pt-2">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            disabled={updateTask.isPending}
                            className="cursor-pointer bg-teal-500 hover:bg-teal-600"
                        >
                            {updateTask.isPending
                                ? "Updating..."
                                : "Update Task"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
