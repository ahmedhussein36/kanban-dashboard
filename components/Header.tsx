"use client";
import AppLogo from "./AppLogo";
<<<<<<< HEAD
import Profile from "./Profile";
=======
import { TaskDialog } from "./TaskDialog";
import SearchBox from "./SearchBox";
>>>>>>> 1f5e3790332653deba81058bb7a045bab292133f

const Header = () => {
    return (
        <header className="border-b ">
<<<<<<< HEAD
            <div className="flex items-center justify-between">
                <AppLogo />
                <Profile />
=======
            <div className=" mx-auto px-6 py-4 flex-col lg:flex-row items-center justify-between gap-4 space-y-3 lg:space-x-3">
                <AppLogo />
                <div className="flex items-center justify-between gap-3">
                    <SearchBox />
                    <TaskDialog />
                </div>
>>>>>>> 1f5e3790332653deba81058bb7a045bab292133f
            </div>
        </header>
    );
};

export default Header;
