// Import custom types
import type { GridType, SpeedType, TileType } from "../../../utils/type";

// Import custom helper functions
import { getRandomInt, isEqualTile, sleep } from "../../../utils/helper-functions";

// Import custom utility functions
import { createWall, destroyWall } from "../../../utils/utility-functions";

// Import custom constants
import { MAX_COLS, MAX_ROWS } from "../../../utils/constant";

// function to perform the Binary-Tree maze algorithm for visualization
export const binaryTreeAlgorithm = async (
    grid: GridType,
    startTile: TileType,
    endTile: TileType,
    speed: SpeedType,
    setIsDisabled: (isDisabled: boolean) => void
) => {
    // create the walls
    createWall(startTile, endTile, speed);

    // halt the execution for short time
    await sleep(MAX_ROWS * MAX_COLS);

    // creating the walls 
    for (const row of grid) {
        for (const tile of row) {
            if (tile.row % 2 === 0 || tile.col % 2 === 0) {
                if (!isEqualTile(tile, startTile) && !isEqualTile(tile, endTile)) {
                    tile.isWall = true;
                }
            }
        }
    }

    // then destroying the walls to make a maze-path
    for (let row = 1; row < MAX_ROWS; row += 2) {
        for (let col = 1; col < MAX_COLS; col += 2) {
            if (row === MAX_ROWS - 2 && col === MAX_COLS - 2) {
                continue
            } else if (row === MAX_ROWS - 2) {
                await destroyWall(grid, row, col, 1, speed);
            } else if (col === MAX_COLS - 2) {
                await destroyWall(grid, row, col, 0, speed);
            } else {
                await destroyWall(grid, row, col, getRandomInt(0, 2), speed);
            }
        }
    }

    setIsDisabled(false);
};