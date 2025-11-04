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
import { Plus } from "lucide-react";
import { useCreateTask } from "@/hooks/useTasks";
import { COLUMNS, COLUMN_LABELS } from "@/types/task";
import type { TaskColumn } from "@/types/task";
import { useToast } from "@/hooks/use-toast";

export function TaskDialog() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [column, setColumn] = useState<TaskColumn>("backlog");

    const createTask = useCreateTask();
    const { toast } = useToast();

    const handleCreate = async () => {
        if (!title.trim()) return;

        createTask.mutate(
            { title, description, column },
            {
                onSuccess: () => {
                    toast({
                        variant: "default",
                        title: "Task created successfully",
                        description: `New task added to  < ${COLUMN_LABELS[column]} > column.`,
                        className: "bg-green-100 text-green-700",
                    });
                    setTitle("");
                    setDescription("");
                    setColumn("backlog");
                    setOpen(false);
                },
                onError: () => {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description:
                            "There was an error creating the task. Please try again.",
                        className: "bg-red-100 text-red-700",
                    });

                    setColumn("backlog");
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
                    className=" bg-teal-500 hover:bg-teal-600 cursor-pointer flex items-center"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
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
                            onClick={handleCreate}
                            disabled={!title.trim() || createTask.isPending}
                            className=" cursor-pointer bg-teal-500 hover:bg-teal-600"
                        >
                            {createTask.isPending ? "Creating..." : "Create"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
