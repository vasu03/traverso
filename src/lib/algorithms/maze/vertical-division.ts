// Import custom constants
import { SELECT_SPEED_LIST, WALL_TILE_STYLE } from "../../../utils/constant";

// Import custom helper functions
import { getRandomInt, isEqualTile, sleep } from "../../../utils/helper-functions";

// Import custom types
import type { GridType, SpeedType, TileType } from "../../../utils/type";

// Import custom maze algorithms
import { recursiveDivisionAlgorithm } from "./recursive-division-algorithm";

// Utility function to perform the vertical division for Recursive-Division 
export const verticalDivision = async (
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
    // Determine the col for placing a wall
    const makeWallAt = col + getRandomInt(0, width - 1) * 2 + 1;
    // Determine the row to leave a passage
    const makePassageAt = row + getRandomInt(0, height) * 2 ;

    for (let i = 0; i < 2 * height - 1; i+=1) {
        // create a vertical wall
        if (makePassageAt !== row + i) {
            // check if current tile is niether start nor end tile
            if (!isEqualTile(grid[row + i][makeWallAt], startTile) && !isEqualTile(grid[row + i][makeWallAt], endTile)) {
                // set the current tile as a wall
                grid[row + i][makeWallAt].isWall = true;

                document.getElementById(`${row + i}-${makeWallAt}`)!.className = `${WALL_TILE_STYLE}`;
                await sleep(10 * SELECT_SPEED_LIST.find((s) => s.value === speed)!.value - 8);
            }
        }
    }

    // recursively divide left and right to wall
    await recursiveDivisionAlgorithm(grid, startTile, endTile, row, col, height, ((makeWallAt - col + 1) / 2), speed, setIsDisabled);
    await recursiveDivisionAlgorithm(grid, startTile, endTile, row, (makeWallAt + 1), height, (width - (makeWallAt - col + 1) / 2), speed, setIsDisabled);
};