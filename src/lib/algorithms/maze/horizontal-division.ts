// Import custom constants
import { SELECT_SPEED_LIST, WALL_TILE_STYLE } from "../../../utils/constant";

// Import custom helper functions
import { getRandomInt, isEqualTile, sleep } from "../../../utils/helper-functions";

// Import custom types
import type { GridType, SpeedType, TileType } from "../../../utils/type";

// Import custom maze algorithms
import { recursiveDivisionAlgorithm } from "./recursive-division-algorithm";

// Utility function to perform the horizontal division for Recursive-Division 
export const horizontalDivision = async (
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
    // Determine the row for placing a wall
    const makeWallAt = row + getRandomInt(0, height - 1) * 2 + 1;
    // Determine the col to leave a passage
    const makePassageAt = col + getRandomInt(0, width) * 2;

    for (let i = 0; i < 2 * width - 1; i+=1) {
        // create a horizontal wall
        if (makePassageAt !== col + i) {
            // check if current tile is niether start nor end tile
            if (!isEqualTile(grid[makeWallAt][col + i], startTile) && !isEqualTile(grid[makeWallAt][col + i], endTile)) {
                // set the current tile as a wall
                grid[makeWallAt][col + i].isWall = true;

                document.getElementById(`${makeWallAt}-${col + i}`)!.className = `${WALL_TILE_STYLE}`;
                await sleep(10 * SELECT_SPEED_LIST.find((s) => s.value === speed)!.value - 8);
            }
        }
    }

    // recursively divide above and below the wall
    await recursiveDivisionAlgorithm(grid, startTile, endTile, row, col, ((makeWallAt - row + 1) / 2), width, speed, setIsDisabled);
    await recursiveDivisionAlgorithm(grid, startTile, endTile, (makeWallAt + 1), col, (height - (makeWallAt - row + 1) / 2), width, speed, setIsDisabled);
};