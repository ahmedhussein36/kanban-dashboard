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

type DeleteTaskAlertProps = {
    onDelete: () => void;
    trigger: React.ReactNode;
    taskName?: string;
};

export function DeleteTaskAlert({
    onDelete,
    trigger,
    taskName,
}: DeleteTaskAlertProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <Trash2 className="inline mb-1 mr-2 h-5 w-5 text-rose-600" />
                        Delete Task
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {`Are you sure you want to delete${
                            taskName ? ` "${taskName}"` : ""
                        }? This action cannot be undone.`}
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
