// Import icons
import { Github } from "lucide-react";

// A footer component for the application
export const Footer = () => {
    return (
        <footer className="flex items-center justify-between min-h-[3rem] px-1 md:px-6 py-1 border-t border-neutral-600">
            <span className="w-fit text-gray-500 text-xs">
                &copy; {new Date().getFullYear()} Traverso
            </span>
            <span className="w-fit text-gray-500 text-xs">
                Developed by Vasu Makadia
            </span>
            <a href="https://github.com/vasu03/traverso" className="w-fit flex items-center justify-center rounded-full p-1 text-gray-500 border-1 border-gray-500 hover:border-cyan-400 hover:text-cyan-400">
                <Github className="size-4 stroke-2" />
            </a>
        </footer>
    );
};
