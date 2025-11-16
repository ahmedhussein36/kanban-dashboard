"use client";
import AppLogo from "./AppLogo";
import Profile from "./Profile";

const Header = () => {
    return (
        <header className="border-b ">
            <div className="flex items-center justify-between">
                <AppLogo />
                <Profile />
            </div>
        </header>
    );
};

export default Header;
