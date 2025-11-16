"use client";

import { useEffect, useRef } from "react";
import TaskCard from "./TaskCard";
import { Task } from "@/types/task";
import { useDroppable } from "@dnd-kit/core";
import SkeletonTasks from "../SkeletonTasks";
import { useTasks } from "@/hooks/useTasks";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import EmptyState from "../EmptyState";

interface Props {
    column: string;
    label: string;
    tasks: Task[];
    overingTaskId?: number | null;
}

export default function Column({ column, label, tasks, overingTaskId }: Props) {
    const { isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useTasks(column);

    const { setNodeRef } = useDroppable({
        id: column,
        data: { type: "column", column },
    });

    const observerTarget = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const target = observerTarget.current;
        if (!target || !hasNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (
                    first.isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="flex max-h-full flex-col flex-1">
            <div className="bg-muted rounded-lg p-2 flex items-center justify-between">
                <h2 className="font-semibold text-lg">{label}</h2>
                <span className="text-sm text-center text-white bg-teal-500 w-5 h-5 rounded-full flex items-center justify-center">
                    {tasks.length}
                </span>
            </div>

            <div
                ref={setNodeRef}
                className="max-h-[650px] rounded-lg p-3 bg-gray-50 relative overflow-y-auto overflow-x-hidden flex flex-col space-y-2 flex-1 "
            >
                {isLoading ? (
                    <div className="space-y-3">
                        <SkeletonTasks />
                    </div>
                ) : (
                    <SortableContext
                        items={tasks.map((t) => t.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    isOver={overingTaskId === task.id}
                                />
                            ))
                        ) : (
                            <EmptyState label="No Tasks Added" />
                        )}
                        <div ref={observerTarget} className="h-6" />
                    </SortableContext>
                )}

                {isFetchingNextPage && (
                    <div className="mt-2 text-xs text-muted-foreground text-center">
                        Loading more...
                    </div>
                )}
            </div>
        </div>
    );
}
