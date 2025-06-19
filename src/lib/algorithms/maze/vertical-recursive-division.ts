// Import custom types
import type { GridType, SpeedType, TileType } from "../../../utils/type";
// Import helper functions
import { getRandomInt, isEqualTile, sleep } from "../../../utils/helper-functions";
// Import constants
import { SELECT_SPEED_LIST, WALL_TILE_STYLE } from "../../../utils/constant";

// Function to perform the pure horizontal recursive division algorithm
export const verticalRecursiveDivision = async (
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
    // Base case: not enough room
    if (height <= 1 || width <= 1) return;

    // Pick an odd offset for the wall within [col, col+width)
    const maxWalls = Math.floor(width / 2);
    const wallOffset = getRandomInt(0, maxWalls - 1) * 2 + 1;
    const makeWallAt = col + wallOffset;

    // Pick an even offset for the gap within [row, row+height)
    const maxPassage = Math.ceil(height / 2) + 1;
    const PassageOffset = getRandomInt(0, maxPassage - 1) * 2;
    const makePassageAt = row + PassageOffset;

    // Carve the vertical wall
    for (let i = 0; i < height; i++) {
        if (row + i === makePassageAt) continue;
        const tile = grid[row + i][makeWallAt];
        if (!isEqualTile(tile, startTile) && !isEqualTile(tile, endTile)) {
            // set the current tile as a wall
            tile.isWall = true;

            document.getElementById(`${row + i}-${makeWallAt}`)!.className = `${WALL_TILE_STYLE} animate-wall`;
            await sleep(10 * (SELECT_SPEED_LIST.find(s => s.value === speed)?.value ?? 2) - 8);
        }
    }

    // Recurse left of the wall
    await verticalRecursiveDivision(grid, startTile, endTile, row, col, height, wallOffset, speed, setIsDisabled);
    // Recurse right of the wall
    await verticalRecursiveDivision(grid, startTile, endTile, row, (makeWallAt + 1), height, (width - wallOffset - 1), speed, setIsDisabled);
};
