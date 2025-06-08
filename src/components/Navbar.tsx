// // Import required modules

// Import custom components
import { SettingsMenu } from "./SettingsMenu";

// A navbar component for app
export const Navbar = () => {

    // TSX to render the component
    return (
        <nav className="flex items-center justify-between min-h-[4rem] px-1 md:px-6 py-2 border-b border-neutral-600">
            <div className="flex flex-col -space-y-1 w-fit">
                <span className="text-4xl font-extrabold bg-linear-to-tr bg-clip-text from-blue-500 via-sky-300 to-blue-600 text-transparent">
                    Traverso
                </span>
                <span className="text-[9px] tracking-wider text-center text-neutral-300">Making invisible, visible</span>
            </div>
            <div className="w-[50%] p-1">
                <SettingsMenu />
            </div>
        </nav>
    );
}; 