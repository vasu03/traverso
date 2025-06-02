// Import custom types
import type { GridType, TileType } from "./type";

// Import custom constants
import { MAX_COLS, MAX_ROWS } from "./constant";

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
            isEnd: row === endTile.row && col === endTile.col,
            isStart: row === startTile.row && col === endTile.col,
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