import * as React from "react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

type DeleteTaskAlertProps = {
    onDelete: () => void;
};

export function DeleteTaskAlert({ onDelete }: DeleteTaskAlertProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="default"
                    size="icon-lg"
                    aria-label="delete-task"
                    title="Delete task"
                    className="cursor-pointer h-8 w-8 p-0 bg-rose-100 hover:bg-rose-200/70 text-rose-600 hover:text-rose-700"
                >
                    <Trash2 className="h-3 w-3" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <Trash2 className="inline mb-1 mr-2 h-5 w-5 text-rose-600" />
                        Delete Task
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this task? This
                        actioncannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onDelete}
                        className=" cursor-pointer bg-rose-600 hover:bg-rose-700 text-white"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
