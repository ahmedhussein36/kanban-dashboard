"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { useTasks } from "@/hooks/useTasks";
import { useKanbanStore } from "@/store/useKanbanStore";
import type { TaskColumn } from "@/types/task";
import { TaskCard } from "./TaskCard";
import SkeletonTasks from "./SkeletonTasks";
import EmptyState from "./ui/EmptyState";
import { StrictModeDroppable as Droppable } from "@/helper/StrictModeDroppable";

interface ColumnProps {
    column: TaskColumn;
    label: string;
}

export const Column = React.memo(({ column, label }: ColumnProps) => {
    const searchTerm = useKanbanStore((state) => state.searchTerm);
    const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
        useTasks(column);

    const observerTarget = useRef<HTMLDivElement | null>(null);

    const allTasks = useMemo(() => data?.pages.flat() || [], [data?.pages]);
    const tasks = useMemo(() => {
        if (!searchTerm) return allTasks;
        return allTasks.filter(
            (t) =>
                t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allTasks, searchTerm]);

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
        <div className="flex max-h-full flex-col min-h-[400px] min-w-[200px]">
            <div className="mb-4 bg-muted rounded-lg p-3 flex items-center justify-between">
                <h2 className="font-semibold text-lg">{label}</h2>
                <span className="text-sm text-center text-white bg-teal-500 w-6 h-6 rounded-full flex items-center justify-center">
                    {tasks.length}
                </span>
            </div>

            <Droppable droppableId={column}>
                {(provided: any, snapshot: any) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`rounded-lg p-3  relative overflow-y-auto overflow-x-hidden ${
                            snapshot.isDraggingOver
                                ? "border-3 border-dashed border-purple-400 bg-purple-50"
                                : "bg-muted/50"
                        }`}
                    >
                        {isLoading ? (
                            <div className="space-y-3">
                                <SkeletonTasks />
                            </div>
                        ) : (
                            <>
                                {allTasks.length ? (
                                    allTasks.map((task, index) => (
                                        <TaskCard
                                            key={task.id}
                                            index={index}
                                            task={task}
                                        />
                                    ))
                                ) : (
                                    <EmptyState label={"No Tasks Added"} />
                                )}
                                {provided.placeholder}
                                <div ref={observerTarget} className="h-6" />
                            </>
                        )}
                    </div>
                )}
            </Droppable>

            {isFetchingNextPage && (
                <div className="mt-2 text-xs text-muted-foreground text-center">
                    Loading more...
                </div>
            )}
        </div>
    );
});
