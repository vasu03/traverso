// Import custom types
import type { GridType, SpeedType, TileType } from "../../../utils/type";

// import custom maze algorithms
import { horizontalDivision } from "./horizontal-division";
import { verticalDivision } from "./vertical-division";

// function to perform the Recursive-Division maze algorithm for visualization
export const recursiveDivisionAlgorithm = async (
    grid: GridType,
    startTile: TileType,
    endTile: TileType,
    row: number,
    col: number,
    height: number,
    width: number,
    speed: SpeedType,
    setIsDisabled: (isDisabled: boolean) => void
) => {
    // Base case for recursion
    if (height <= 1 || width <= 1) return;

    if (height > width) {
        await horizontalDivision(grid, startTile, endTile, row, col, height, width, speed, setIsDisabled); 
    } else {
        await verticalDivision(grid, startTile, endTile, row, col, height, width, speed, setIsDisabled);
    }
};