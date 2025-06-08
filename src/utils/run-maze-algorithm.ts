 // Import custom types
import type { GridType, MazeType, SpeedType, TileType } from "./type";

// Import custom algorithmicc functions
import { binaryTreeAlgorithm } from "../lib/algorithms/maze/binary-tree-algorithm";
import { recursiveDivisionAlgorithm } from "../lib/algorithms/maze/recursive-division-algorithm";

// function to start the execution of Maze algorithm as selected
export const runMazeAlgorithm = async ( 
    maze: MazeType, 
    grid: GridType, 
    startTile: TileType, 
    endTile: TileType, 
    speed: SpeedType, 
    setIsDisabled: (isDisabled: boolean) => void
) => {
    // execute the binary-tree algorithm
    if (maze === "BINARY_TREE") {
        await binaryTreeAlgorithm(grid, startTile, endTile, speed, setIsDisabled);
    }
    
    // execute the recursive-division algorithm
    if (maze === "RECURSIVE_DIVISION") {
        await recursiveDivisionAlgorithm(grid, startTile, endTile, speed, setIsDisabled);
    }
};