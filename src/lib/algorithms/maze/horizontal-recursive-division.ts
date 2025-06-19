// Import custom types
import type { GridType, SpeedType, TileType } from "../../../utils/type";
// Import helper functions
import { getRandomInt, isEqualTile, sleep } from "../../../utils/helper-functions";
// Import constants
import { SELECT_SPEED_LIST, WALL_TILE_STYLE } from "../../../utils/constant";

// Function to perform the pure horizontal recursive division algorithm
export const horizontalRecursiveDivision = async (
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

    // Pick an odd offset for the wall within [row, row+height)
    const maxWalls = Math.floor(height / 2);
    const wallOffset = getRandomInt(0, maxWalls - 1) * 2 + 1;
    const makeWallAt = row + wallOffset;

    // Pick an even offset for the gap within [col, col+width)
    const maxGaps = Math.ceil(width / 2);
    const gapOffset = getRandomInt(0, maxGaps - 1) * 2;
    const makePassageAt = col + gapOffset;

    // Carve the horizontal wall
    for (let i = 0; i < width; i++) {
        if (col + i === makePassageAt) continue;
        const tile = grid[makeWallAt][col + i];
        if (!isEqualTile(tile, startTile) && !isEqualTile(tile, endTile)) {
            // set the current tile as a wall 
            tile.isWall = true;

            document.getElementById(`${makeWallAt}-${col + i}`)!.className = `${WALL_TILE_STYLE} animate-wall`;
            await sleep(10 * (SELECT_SPEED_LIST.find(s => s.value === speed)!.value ?? 2) - 8);
        }
    }

    // Recurse above the wall
    await horizontalRecursiveDivision(grid, startTile, endTile, row, col, wallOffset, width, speed, setIsDisabled);
    // Recurse below the wall
    await horizontalRecursiveDivision(grid, startTile, endTile, (makeWallAt + 1), col, (height - wallOffset - 1), width, speed, setIsDisabled);
};
