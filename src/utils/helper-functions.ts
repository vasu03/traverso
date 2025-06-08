// Import custom types
import type { TileType } from "./type";

// Import custom constants
import { MAX_COLS, MAX_ROWS } from "./constant";

// Helper function to check if we are at Start or End of the grid
export const checkIfStartOrEnd = (row: number, col: number) => {
    return (
        (row === 1 && col === 1) || (row === MAX_ROWS - 2 && col === MAX_COLS - 2)
    );
};

// Helper function to check the equality between given tile
export const isEqualTile = (a: TileType, b: TileType) => {
    return a.row === b.row && a.col === b.col;
};

// Helper function to check the equality between given row and column for a tile
export const isEqualRowCol = (row: number, col: number, tile: TileType) => {
    return row === tile.row && col === tile.col;
};

// Helper function to perform the sleep operation
export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// Helper function to get a random integer everytime
export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
};