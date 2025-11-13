import React from "react";
import { Skeleton } from "./ui/skeleton";

const SkeletonTasks = () => {
    return (
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="space-y-3 p-3 bg-neutral-100">
                    <Skeleton className=" h-4 w-8 bg-neutral-200" />
                    <Skeleton className=" h-4 w-1/2 bg-neutral-200" />
                    <Skeleton className="h-4 w-2/3 bg-neutral-200" />
                    <Skeleton className="h-4 w-3/4 bg-neutral-200" />
                    <div className=" flex w-full justify-end space-x-2">
                        <Skeleton className="h-5 w-5 bg-neutral-200" />
                        <Skeleton className="h-5 w-5 bg-neutral-200" />
                    </div>
                </Skeleton>
            ))}
        </div>
    );
};

export default SkeletonTasks;
