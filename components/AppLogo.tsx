import Image from "next/image";
import Link from "next/link";
import React from "react";

const AppLogo = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
            <h1 className="text-2xl font-bold">Kanban Board</h1>
        </Link>
    );
};

export default AppLogo;
