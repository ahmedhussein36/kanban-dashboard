import { GithubIcon, LinkedinIcon } from "lucide-react";
import React from "react";

const Profile = () => {
    return (
        <div className="bg-linear-to-r from-indigo-900/90 to-purple-800/90 w-72 text-center border shadow-xl p-2 rounded-lg ">
            <div className="flex justify-start items-start gap-4">
                <div className="rounded-full w-14 h-14 border bg-muted flex-justify-center items-center overflow-hidden">
                    <img
                        src="https://avatars.githubusercontent.com/u/105352918?v=4"
                        alt="Developer Avatar"
                        className="rounded-full w-14 h-14 object-cover"
                    />
                </div>
                <div>
                    <div className="text-sm text-gray-50 mb-2 flex flex-col justify-start items-start">
                        <span className=" text-xs">Developed by</span>
                        <div className="">Ahmed Hussein</div>
                    </div>
                    <div className=" w-full flex justify-center items-center space-x-4 gap-8 text-sm text-gray-50">
                        <a
                            href="https://github.com/ahmedhussein36"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            <GithubIcon className="inline-block mr-1 w-4 h-4" />
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ahmed-hussein36/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            <LinkedinIcon className="inline-block mr-1 w-4 h-4" />
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
