import { GithubIcon, LinkedinIcon } from "lucide-react";
import React from "react";

const Footer = () => {
    return (
        <footer>
            <div className="mx-auto relative  bottom-8 backdrop:blur-md bg-linear-to-r from-indigo-900/90 to-purple-800/90 w-96 py-4 text-center border shadow-xl p-4 rounded-lg mt-4 ">
                <div className="flex justify-start items-start gap-4 ">
                    <div className="rounded-full w-16 h-16 border bg-muted flex-justify-center items-center overflow-hidden">
                        <img
                            src="https://avatars.githubusercontent.com/u/105352918?v=4"
                            alt="Developer Avatar"
                            className="rounded-full w-16 h-16 object-cover"
                        />
                    </div>
                    <div>
                        <div className="text-sm text-gray-50 mb-2 flex flex-col justify-start items-start">
                            <span className=" text-xs">Developed by</span>
                            <div className=" text-lg font-semibold">
                                Ahmed Hussein
                            </div>
                        </div>
                        <div className=" w-full flex justify-center items-center space-x-4 gap-8 text-sm text-gray-50">
                            <a
                                href="https://github.com/ahmedhussein36"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <GithubIcon className="inline-block mr-1 w-4 h-4" />
                                GitHub
                            </a>
                            <a
                                href="https://www.linkedin.com/in/ahmed-hussein36/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <LinkedinIcon className="inline-block mr-1 w-4 h-4" />
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
