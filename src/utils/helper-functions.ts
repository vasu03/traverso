// Import custom types
import type { GridType, SpeedType, TileType } from "./type";

// Import custom constants
import { BASE_TILE_STYLE, END_TILE_CONFIG, MAX_COLS, MAX_ROWS, SELECT_SPEED_LIST, START_TILE_CONFIG, WALL_TILE_STYLE } from "./constant";

// Helper function to create a individual row
const createRow = (row: number, startTile: TileType, endTile: TileType) => {
    // initialise the current row as an empty array
    const current_row = [];
    // insert the columns into the current_row
    for (let col: number = 0; col < MAX_COLS; col++) {
        current_row.push({
            row,
            col,
            isWall: false,
            isPath: false,
            parent: null,
            distance: Infinity,
            isStart: row === startTile.row && col === startTile.col,
            isEnd: row === endTile.row && col === endTile.col,
            isTraversed: false,
        });
    }
    return current_row;
};

// Helper function to create the Grid
export const createGrid = (startTile: TileType, endTile: TileType) => {
    // initialize a grid as an empty array
    const grid: GridType = [];
    // pushing rows into the grid
    for (let row: number = 0; row < MAX_ROWS; row++) {
        grid.push(createRow(row, startTile, endTile));
    }
    return grid;
};

// Helper function to check if we are at Start or End of the grid
export const checkIfStartOrEnd = (row: number, col: number) => {
    return (
        (row === 1 && col === 1) || (row === MAX_ROWS - 2 && col === MAX_COLS - 2)
    );
};

// Helper function to create a new grid out of old grid
export const createNewGrid = (grid: GridType, row: number, col: number) => {
    // get a part of old grid to create a shallow copy of it
    const newGrid = grid.slice();
    // create a new tile for the new grid
    const newTile = {
        ...newGrid[row][col],
        // if tile was a wall then make it normal or vice-versa
        isWall: !newGrid[row][col].isWall,
    };
    // assign the new tile to the new grid
    newGrid[row][col] = newTile;
    // return the new grid
    return newGrid;
};

// Helper function to check the equality between given tile
export const isEqualTile = (a: TileType, b: TileType) => {
    return a.row === b.row && a.col === b.col;
};

// Helper function to check the equality between given row and column for a tile
export const isEqualRowCol = (row: number, col: number, tile: TileType) => {
    return row === tile.row && col === tile.col;
};

// Helper function to reset the grid
export const resetGrid = (grid: GridType, startTile: TileType = START_TILE_CONFIG, endTile: TileType = END_TILE_CONFIG) => {
    for (let row: number = 0; row < MAX_ROWS; row++) {
        for (let col: number = 0; col < MAX_COLS; col++) {
            // get each tile from grid
            const tile = grid[row][col];
            // Reset the tile configs
            tile.distance = Infinity;
            tile.isTraversed = false;
            tile.isPath = false;
            tile.isWall = false;
            tile.parent = null;
            // check if niether the first or last tile
            if (!isEqualTile(startTile, tile) && !isEqualTile(endTile, tile)) {
                const tileElement = document.getElementById(`${tile.row}-${tile.col}`);
                // if this tile givenelement exists then reset the stylings
                if (tileElement) {
                    tileElement.classList = BASE_TILE_STYLE;
                    if (tile.row === MAX_ROWS - 1) {
                        tileElement.classList.add("border-b");
                    } else if (tile.col === 0) {
                        tileElement.classList.add("border-l");
                    }
                }
            }
        }
    }
};

// Helper function to create the Wall elements
export const createWall = (startTile: TileType, endTile: TileType, speed: SpeedType) => {
    // animation delay while creating walls
    const delay = 6 * SELECT_SPEED_LIST.find((s) => s.value === speed)!.value - 1;

    for (let row: number = 0; row < MAX_ROWS; row++) {
        setTimeout(() => {
            for (let col: number = 0; col < MAX_COLS; col++) {
                if (row % 2 === 0 || col % 2 === 0) {
                    if (!isEqualRowCol(row, col, startTile) && !isEqualRowCol(row, col, endTile)) {
                        setTimeout(() => {
                            document.getElementById(`${row}-${col}`)!.className = `${WALL_TILE_STYLE}`
                        }, delay * col);
                    }
                }
            }
        }, delay * (MAX_ROWS / 2) * row);
    }
};

// Helper function to perform the sleep operation
export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// Helper function to destroy a piece of wall
export const destroyWall = async (grid: GridType, row: number, col: number, isRight: number, speed: SpeedType) => {
    if (isRight && grid[row][col + 1]) {
        grid[row][col + 1].isWall = false;
        document.getElementById(`${row}-${col + 1}`)!.className = BASE_TILE_STYLE;
        await sleep(20 * SELECT_SPEED_LIST.find((s) => s.value === speed)!.value - 8);
    } else if (grid[row + 1]) {
        grid[row + 1][col].isWall = false;
        document.getElementById(`${row + 1}-${col}`)!.className = BASE_TILE_STYLE;
        await sleep(20 * SELECT_SPEED_LIST.find((s) => s.value === speed)!.value - 8);
    } else {
        grid[row][col].isWall = false;
        document.getElementById(`${row}-${col}`)!.className = BASE_TILE_STYLE;
        await sleep(20 * SELECT_SPEED_LIST.find((s) => s.value === speed)!.value - 8);
    }
};

// Helper function to get a random integer everytime
export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
};