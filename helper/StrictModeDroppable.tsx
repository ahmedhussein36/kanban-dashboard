"use client";
import { Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";

interface StrictModeDroppableProps {
    children: any;
    droppableId: string;
}

export const StrictModeDroppable = ({
    children,
    ...props
}: StrictModeDroppableProps) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    if (!enabled) {
        return null;
    }

    return <Droppable {...props}>{children}</Droppable>;
};
