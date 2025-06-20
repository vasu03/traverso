// Import custom types
import type { GridType, MazeType, SpeedType, TileType } from "./type";

// Import custom algorithmic functions
import { binaryTreeAlgorithm } from "../lib/algorithms/maze/binary-tree-algorithm";
import { recursiveDivisionAlgorithm } from "../lib/algorithms/maze/recursive-division-algorithm";
import { horizontalRecursiveDivision } from "../lib/algorithms/maze/horizontal-recursive-division";
import { verticalRecursiveDivision } from "../lib/algorithms/maze/vertical-recursive-division";
import { linkedLadderAlgorithm } from "../lib/algorithms/maze/linked-ladder";

// Import custom utility functions
import { constructRDBorder } from "./utility-functions";

// Import custom constants
import { MAX_COLS, MAX_ROWS, SELECT_SPEED_LIST } from "./constant";

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
        // get the current speed
        const currSpeed = SELECT_SPEED_LIST.find((s) => s.value === speed)!.value ?? 2;
        // construct a constraint border for Recursive-Division to operate in safe area
        await constructRDBorder(grid, startTile, endTile);
        // perform the division recursively
        await recursiveDivisionAlgorithm(grid, startTile, endTile, 1, 1, Math.floor((MAX_ROWS - 1) / 2), Math.floor((MAX_COLS - 1) / 2), speed, setIsDisabled);

        setTimeout(() => {
            setIsDisabled(false);
        }, 800 * currSpeed);
    }

    if (maze === "HORIZONTAL_RECURSIVE_DIVISION") {
        // get the current speed
        const currSpeed = SELECT_SPEED_LIST.find((s) => s.value === speed)!.value ?? 2;
        // construct a constraint border for Recursive-Division to operate in safe area
        await constructRDBorder(grid, startTile, endTile);
        // perform the horizontal division recursively
        await horizontalRecursiveDivision(grid, startTile, endTile, 1, 1, MAX_ROWS - 2, MAX_COLS - 2, speed, setIsDisabled);

        setTimeout(() => {
            setIsDisabled(false);
        }, 800 * currSpeed);
    }

    if (maze === "VERTICAL_RECURSIVE_DIVISION") {
        // get the current speed
        const currSpeed = SELECT_SPEED_LIST.find((s) => s.value === speed)!.value ?? 2;
        // construct a constraint border for Recursive-Division to operate in safe area
        await constructRDBorder(grid, startTile, endTile);
        // perform the vertical division recursively
        await verticalRecursiveDivision(grid, startTile, endTile, 1, 1, MAX_ROWS - 2, MAX_COLS - 2, speed, setIsDisabled);

        setTimeout(() => {
            setIsDisabled(false);
        }, 800 * currSpeed);
    }

    if (maze === "LINKED_LADDER") {
        // get the current speed
        const currSpeed = SELECT_SPEED_LIST.find((s) => s.value === speed)!.value ?? 2;

        await linkedLadderAlgorithm(grid, startTile, endTile, currSpeed, setIsDisabled);
    }
};