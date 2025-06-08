// Import required modules
import type { MouseEventHandler } from "react";

// Import icons
import { RotateCw, Play } from "lucide-react";

// Define the props for PlayButton
interface PlayButtonProps {
    handleRunVisualizer: MouseEventHandler<HTMLButtonElement>,
    isDisabled: boolean,
    isGraphVisualized: boolean,
};

// A button component to start the visualization process
export const PlayButton = ({ handleRunVisualizer, isDisabled, isGraphVisualized }: PlayButtonProps) => {

    // TSX to render the component
    return (
        <button
            type="button"
            disabled={isDisabled}
            onClick={handleRunVisualizer}
            className="bg-green-500 border-none hover:bg-green-600 active:ring-green-300 focus:outline-none focus:ring-3 focus:ring-green-300 focus:ring-opacity-30 transition-all ease-in text-white p-[10px] rounded-md mt-2 cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50" >
            {isGraphVisualized ? (<RotateCw className="stroke-2" />) : (<Play className="stroke-3" />)}
        </button>
    );
};
