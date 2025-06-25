// Import required modules
import { twMerge } from "tailwind-merge";
import { useState, type RefObject } from "react";

// Import custom components
import { Tile } from "./Tile";

// Import custom hooks
import { useTraversal } from "../hooks/use-traversal";

// Import custom constants
import { MAX_COLS, MAX_ROWS } from "../utils/constant";

// Import custom helper functions
import { checkIfStartOrEnd } from "../utils/helper-functions";

// Import custom utility functions
import { createNewGrid } from "../utils/utility-functions";

// A grid component for visualizing traversal
export const Grid = ({ isVisualizationRunningRef }: { isVisualizationRunningRef: RefObject<boolean> }) => {
    // access the grid and setGrid states from TraversalContext
    const { grid, setGrid } = useTraversal();

    // state to variable to track if Mouse is pressed or not
    const [isMousePressed, setIsMousePressed] = useState<boolean>(false);

    // function to handle if mouse button is pressed down
    const handleMousePressed = (row: number, col: number) => {
        // check if visualization is still in progress
        if (isVisualizationRunningRef.current === true || checkIfStartOrEnd(row, col)) return;
        // set the state to true
        setIsMousePressed(true);
        // create a new grid
        const newGrid = createNewGrid(grid, row, col);
        // set the newly created grid
        setGrid(newGrid);
    };

    // function to handle if mouse button is released up
    const handleMouseReleased = (row: number, col: number) => {
        // check if visualization is still in progress
        if (isVisualizationRunningRef.current === true || checkIfStartOrEnd(row, col)) return;
        // set the state to false
        setIsMousePressed(false);
    };

    // function to handle the mouse hovering/entering event to see if mouse is pressed and moving on grid
    const handleMouseEnter = (row: number, col: number) => {
        // check if visualization is still in progress
        if (isVisualizationRunningRef.current === true || checkIfStartOrEnd(row, col)) return;
        // if user is trying to draw the walls on grid then create a new grid
        if (isMousePressed) {
            const newGrid = createNewGrid(grid, row, col);
            setGrid(newGrid);
        }
    };

    // TSX to render the grid
    return (
        <div className={twMerge(
            // Base classes
            "flex flex-col items-center justify-center h-fit w-fit mx-auto my-2",
            // Grid heights for responsive behavior
            `lg:min-h-[${MAX_ROWS * 16}px] md:min-h-[${MAX_ROWS * 14}px] xs:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]`,
            // Grid widths for responsive behavior
            `lg:min-w-[${MAX_COLS * 16}px] md:min-w-[${MAX_COLS * 14}px] xs:min-w-[${MAX_COLS * 8}px] min-w-[${MAX_COLS * 7}px]`,
            // 
        )}>
            {grid.map((row, rowIdx) => (
                <div className="flex" key={rowIdx}>
                    {row.map((tile, tileIdx) => {
                        const { isStart, isEnd, isTraversed, isWall, isPath } = tile;
                        return (
                            <Tile
                                row={tile.row}
                                col={tile.col}
                                isStart={isStart}
                                isEnd={isEnd}
                                isTraversed={isTraversed}
                                isWall={isWall}
                                isPath={isPath}
                                handleMousePressed = {() => handleMousePressed(tile.row, tile.col)}
                                handleMouseReleased = {() => handleMouseReleased(tile.row, tile.col)}
                                handleMouseEnter = {() => handleMouseEnter(tile.row, tile.col)}
                                key={tileIdx}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};