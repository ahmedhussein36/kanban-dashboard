"use client";

import { useEffect, useRef, useMemo } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "./task-card";
import { useTasks } from "@/hooks/useTasks";
import { Skeleton } from "@/components/ui/skeleton";
import { useKanbanStore } from "@/store/useKanbanStore";
import type { TaskColumn } from "@/types/task";

interface ColumnProps {
    column: TaskColumn;
    label: string;
}

export function Column({ column, label }: ColumnProps) {
    const searchTerm = useKanbanStore((state) => state.searchTerm);
    const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
        useTasks(column);

    const observerTarget = useRef<HTMLDivElement | null>(null);

    const tasks = useMemo(() => {
        const allTasks = data?.pages.flat() || [];
        if (!searchTerm) return allTasks;
        return allTasks.filter(
            (t) =>
                t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    // useEffect(() => {
    //     const target = observerTarget.current;
    //     if (!target || !hasNextPage) return;

    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             const first = entries[0];
    //             if (
    //                 first.isIntersecting &&
    //                 hasNextPage &&
    //                 !isFetchingNextPage
    //             ) {
    //                 fetchNextPage();
    //             }
    //         },
    //         { threshold: 0.2 }
    //     );

    //     observer.observe(target);
    //     return () => observer.disconnect();
    // }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="flex flex-col min-h-[500px] max-h-[680px] min-w-72">
            <div className="mb-4 bg-muted rounded-lg p-3 flex items-center justify-between">
                <h2 className="font-semibold text-lg">{label}</h2>
                <span className="text-sm text-center text-white bg-teal-500 w-6 h-6 rounded-full flex items-center justify-center">
                    {tasks.length}
                </span>
            </div>

            <Droppable droppableId={column}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 rounded-lg p-3 transition-colors overflow-y-auto overflow-x-hidden ${
                            snapshot.isDraggingOver
                                ? "bg-primary/5 border border-primary/10"
                                : "bg-muted/50"
                        }`}
                    >
                        {isLoading ? (
                            <div className="space-y-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Skeleton key={i} className="h-32 w-full" />
                                ))}
                            </div>
                        ) : (
                            <>
                                {tasks.map((task, index) => (
                                    <TaskCard
                                        key={task.id}
                                        index={index}
                                        task={task}
                                    />
                                ))}
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
}
