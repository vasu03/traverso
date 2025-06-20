// import custom types
import type { GridType, SpeedType, TileType } from "../../../utils/type";

// Import custom utility functions
import { constructRDBorder } from "../../../utils/utility-functions";

// Import custom helper functions
import { isEqualRowCol, isEqualTile, sleep } from "../../../utils/helper-functions";

// Import custom constants
import { MAX_ROWS, MAX_COLS, SELECT_SPEED_LIST, WALL_TILE_STYLE, BASE_TILE_STYLE } from "../../../utils/constant";

// Function to prepare a linked ladder maze on the grid
export const linkedLadderAlgorithm = async (
    grid: GridType,
    startTile: TileType,
    endTile: TileType,
    speed: SpeedType,
    setIsDisabled: (isDisabled: boolean) => void
) => {
    // set the disabled state to true
    setIsDisabled(true);
    // construct the constraint border on the grid 
    await constructRDBorder(grid, startTile, endTile);
    // calculate the delay for sleep
    const delay = 10 * SELECT_SPEED_LIST.find((s) => s.value === speed)!.value - 1;
    // create the walls on the grid
    await createWall(grid, startTile, endTile, delay);
    // destroy non-required walls 
    await destroyWall(grid, startTile, endTile, delay);
    // set the disabled state to false
    setIsDisabled(false);
};

// helper function to create the walls on the grid
const createWall = async (
    grid: GridType,
    startTile: TileType,
    endTile: TileType,
    delay: number
) => {
    for (let row = 1; row < MAX_ROWS; row++) {
        for (let col = 1; col < MAX_COLS; (row % 2 === 0 ? (col += 2) : col += 4)) {
            // get the current tile
            const tile = grid[row][col];
            // skip start/end
            if (isEqualRowCol(row, col, startTile) || isEqualRowCol(row, col, endTile)) continue;
            // animate carving one at a time
            await sleep(delay);
            tile.isWall = true;
            document.getElementById(`${row}-${col}`)!.classList.add(...WALL_TILE_STYLE.split(" "), "animate-wall");
        }
    }
};

// Helper function to destroy the non-required walls on the grid
const destroyWall = async (
    grid: GridType,
    startTile: TileType,
    endTile: TileType,
    delay: number
) => {
    for (let row = 2; row < MAX_ROWS - 1; row += 8) {
        for (let col = 1; col < MAX_COLS; col += 4) {
            // get the current tile
            const tile = grid[row][col];
            // skip start/end and only destroy if it *is* a wall
            if (isEqualTile(tile, startTile) || isEqualTile(tile, endTile)) continue;
            // animate destruction
            await sleep(delay);
            tile.isWall = false;
            document.getElementById(`${row}-${col}`)!.className = BASE_TILE_STYLE;
        }
    }
};