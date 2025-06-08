// Import required modules
import { useState } from "react";

// Import custom components
import { PlayButton } from "./PlayButton";
import { Select } from "./Select";

// Import custom constants
import { SELECT_MAZE_LIST } from "../utils/constant";

// Import custom types
import type { MazeType } from "../utils/type";

// Import custom utility functions 
import { resetGrid } from "../utils/utility-functions";
import { runMazeAlgorithm } from "../utils/run-maze-algorithm";

// Import custom hooks
import { useTraversal } from "../hooks/use-traversal";
import { useTile } from "../hooks/use-tile";
import { useSpeed } from "../hooks/use-speed";

// A Menu component which allows setting different parameters for visualization
export const SettingsMenu = () => {
    // get the required states from TraversalContext
    const { maze, setMaze, grid, setGrid, setIsGraphVisualized } = useTraversal();
    // get the Start and End tile from TileContext
    const { startTile, endTile } = useTile();
    // get the speed from SpeedContext
    const { speed } = useSpeed();

    // state to handle the Disabling feature
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    // function to handle the maze generation
    const handleGenerateMaze = (maze: MazeType) => {
        if (maze === "NONE") {
            setMaze(maze);
            resetGrid(grid, startTile, endTile);
            return;
        }

        setMaze(maze);
        setIsDisabled(true);

        // execute the selected Maze type algorithm to prepare the maze
        runMazeAlgorithm(maze, grid, startTile, endTile, speed, setIsDisabled);

        // ensure the changes are not made on actual grid
        const newGrid = grid.slice();
        setGrid(newGrid);
        setIsGraphVisualized(false);
    };

    // TSX to render the component
    return (
        <nav className="flex items-center justify-center gap-4 w-full p-1">
            <Select
                label="Maze Type"
                value={maze}
                options={SELECT_MAZE_LIST}
                onChange={(e) => {
                    handleGenerateMaze(e.target.value as MazeType);
                }}
            />
            {/* <PlayButton /> */}
        </nav>
    );
};  