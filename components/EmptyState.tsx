import React from "react";
const EmptyState = ({ label = "No Tasks Added" }: { label?: string }) => {
    return (
        <div className="bg-white p-5 text-muted-foreground flex flex-col justify-center items-center ">
            <img src="/empty-icon.jpg" alt="empty-tasks" width={150} />
            <p>{label}</p>
        </div>
    );
};

export default EmptyState;
