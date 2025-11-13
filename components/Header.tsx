"use client";
import AppLogo from "./AppLogo";
import { TaskDialog } from "./TaskDialog";
import SearchBox from "./SearchBox";

const Header = () => {
    return (
        <header className="border-b ">
            <div className=" mx-auto px-6 py-4 flex-col lg:flex-row items-center justify-between gap-4 space-y-3 lg:space-x-3">
                <AppLogo />
                <div className="flex items-center justify-between gap-3">
                    <SearchBox />
                    <TaskDialog />
                </div>
            </div>
        </header>
    );
};

export default Header;
