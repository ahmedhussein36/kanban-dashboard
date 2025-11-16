import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
    title: " Kanban To-Do List Dashboard",
    description:
        "A simple Kanban board application built with Next.js and TypeScript.",
    authors: [
        {
            name: "Ahmed Hussein Bendary",
            url: "https://github.com/ahmedhussein36",
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
<<<<<<< HEAD
            <body className="bg-background min-h-screen">
                <Toaster />
                {children}
=======
            <body>
                <Toaster />
                {children}
                {/* <Footer /> */}
>>>>>>> 1f5e3790332653deba81058bb7a045bab292133f
            </body>
        </html>
    );
}
