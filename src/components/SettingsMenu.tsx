// Import required modules
import { useState, type RefObject } from "react";

// Import custom components
import { PlayButton } from "./PlayButton";
import { Select } from "./Select";

// Import custom constants
import { EXTENDED_SLEEP_TIME, SELECT_ALGORITHM_LIST, SELECT_MAZE_LIST, SELECT_SPEED_LIST, SLEEP_TIME } from "../utils/constant";

// Import custom types
import type { AlgorithmType, MazeType, SpeedType } from "../utils/type";

// Import custom utility functions 
import { animatePath, resetGrid } from "../utils/utility-functions";
import { runMazeAlgorithm } from "../utils/run-maze-algorithm";

// Import custom hooks
import { useTraversal } from "../hooks/use-traversal";
import { useTile } from "../hooks/use-tile";
import { useSpeed } from "../hooks/use-speed";
import { runTraversalAlgorithm } from "../utils/run-traversal-algorithm";

// A Menu component which allows setting different parameters for visualization
export const SettingsMenu = ({ isVisualizationRunningRef }: { isVisualizationRunningRef: RefObject<boolean> }) => {
    // get the required states from TraversalContext
    const { maze, setMaze, grid, setGrid, isGraphVisualized, setIsGraphVisualized, algorithm, setAlgorithm } = useTraversal();
    // get the Start and End tile from TileContext
    const { startTile, endTile } = useTile();
    // get the speed from SpeedContext
    const { speed, setSpeed } = useSpeed();

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

    // function to handle the running of visualization process
    const handleRunVisualizer = () => {
        // If the graph is already visualized then reset to default configs
        if (isGraphVisualized) {
            setIsGraphVisualized(false);
            setMaze("NONE");
            setAlgorithm("BFS");
            setSpeed(1);
            resetGrid(grid.slice(), startTile, endTile);
            return;
        }

        // execute the selected traversal algorithm
        const { traversedTiles, path } = runTraversalAlgorithm(algorithm, grid, startTile, endTile);

        // apply the animation while visualizing
        animatePath(traversedTiles, path, startTile, endTile, speed);
        setIsDisabled(true);
        isVisualizationRunningRef.current = true;

        // Reset the grid with changes made by traversal algorithm
        const speedValue = SELECT_SPEED_LIST.find(s => s.value === speed)!.value;
        const totalDuration =
            SLEEP_TIME * traversedTiles.length * speedValue +
            EXTENDED_SLEEP_TIME * path.length * speedValue +
            1500;

        setTimeout(() => {
            // Create a new grid with updated path state
            const newGrid = grid.map(row => row.map(tile => {
                // Preserve path state for path tiles
                const isInPath = path.some(p => p.row === tile.row && p.col === tile.col);
                return isInPath ? { ...tile, isPath: true, isTraversed: false } : tile;
            }));

            setGrid(newGrid);
            setIsGraphVisualized(true);
            setIsDisabled(false);
            isVisualizationRunningRef.current = false;
        }, totalDuration);
    };

    // TSX to render the component
    return (
        <nav className="flex items-center justify-end gap-4 w-full p-1">
            <Select
                label="Maze Type"
                value={maze}
                options={SELECT_MAZE_LIST}
                onChange={(e) => {
                    handleGenerateMaze(e.target.value as MazeType);
                }}
            />
            <Select
                label="Algorithm"
                value={algorithm}
                options={SELECT_ALGORITHM_LIST}
                onChange={(e) => {
                    setAlgorithm(e.target.value as AlgorithmType);
                }}
            />
            <Select
                label="Speed"
                value={speed}
                options={SELECT_SPEED_LIST}
                onChange={(e) => {
                    setSpeed(parseFloat(e.target.value) as SpeedType);
                }}
            />
            <PlayButton
                isDisabled={isDisabled}
                isGraphVisualized={isGraphVisualized}
                handleRunVisualizer={handleRunVisualizer}
            />
        </nav>
    );
};  