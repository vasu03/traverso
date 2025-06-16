// Import custom types
import type { GridType, TileType } from "./type";

// Import custom constants
import { MAX_COLS, MAX_ROWS } from "./constant";

// Helper function to check if we are at Start or End of the grid
export const checkIfStartOrEnd = (row: number, col: number): boolean => {
    return (
        (row === 1 && col === 1) || (row === MAX_ROWS - 2 && col === MAX_COLS - 2)
    );
};

// Helper function to check the equality between given tile
export const isEqualTile = (a: TileType, b: TileType): boolean => {
    return a.row === b.row && a.col === b.col;
};

// Helper function to check the equality between given row and column for a tile
export const isEqualRowCol = (row: number, col: number, tile: TileType): boolean => {
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

// Helper function to get all the Untraversed neighbours of a given node
export const getUntraversedNeighbours = (grid: GridType, tile: TileType) => {
    // destructure the row and col from given tile
    const { row, col } = tile;
    // an array to store the neighbours
    const neighbours = [];

    if (row > 0) neighbours.push(grid[row - 1][col]);
    if (row < MAX_ROWS - 1) neighbours.push(grid[row + 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (col < MAX_COLS - 1) neighbours.push(grid[row][col + 1]);

    return neighbours.filter((neighbour) => !neighbour.isTraversed);
};

// Helper function to check if a node is in BFS queue or not
export const isInQueue = (tile: TileType, queue: TileType[]): boolean => {
    for (let i = 0; i < queue.length; i++) {
        if (isEqualTile(tile, queue[i])) return true;
    }
    return false;
};

// Helper function to check if a node is in DFS stack or not
export const isInStack = (tile: TileType, stack: TileType[]): boolean => {
    for (let i = 0; i < stack.length; i++) {
        if (isEqualTile(tile, stack[i])) return true;
    }
    return false;
};

// Helper function to drop a given node from the queue
export const dropFromQueue = (tile: TileType, queue: TileType[]) => {
    for (let i = 0; i < queue.length; i++) {
        if (isEqualTile(tile, queue[i])) {
            queue.splice(i, 1);
            break;
        }
    }
}