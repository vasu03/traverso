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

// Helper function to get all the Non-Wall neighbours of a given node
export const getNonWallNeighbours = (grid: GridType, tile: TileType) => {
    // destructure the row and col from given tile
    const { row, col } = tile;
    // An array to store all the neighbours
    const neighbours = [];

    if (row > 0) neighbours.push(grid[row - 1][col]);
    if (row < MAX_ROWS - 1) neighbours.push(grid[row + 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (col < MAX_COLS - 1) neighbours.push(grid[row][col + 1]);
    return neighbours.filter(neighbour => !neighbour.isWall);
};

// Helper function to detect any negative cycles for Bellman-Ford algo (unlikely to have any in grids)
export const detectNegativeCycle = (grid: GridType): boolean => {
    for (let row = 0; row < MAX_ROWS; row++) {
        for (let col = 0; col < MAX_COLS; col++) {
            // get the current tile 
            const tile = grid[row][col];
            // skip the tile if its wall or if its unreachable
            if (tile.isWall || tile.distance === Infinity) continue;
            // Get all the Non-Wall neighbours of current tile
            const neighbours = getNonWallNeighbours(grid, tile);
            // check for a negative cycle
            for (const neighbour of neighbours) {
                if (tile.distance + 1 < neighbour.distance) {
                    return true;
                }
            }
        }
    }
    return false;
};

// Helper function to initialize the heuristic cost [ h(n) ] for A-Star
export const initHeuristicCost = (grid: GridType, endTile: TileType) => {
    // an 2D array to store all the heuristic costs
    const heuristicCost = [];
    // loop over each row of grid
    for (let row = 0; row < MAX_ROWS; row++) {
        // array to store the heuristic for current row
        const rowHeuristic = [];
        // loop over each col of grid
        for (let col = 0; col < MAX_COLS; col++) {
            // calculate and add heuristic cost for current tile
            rowHeuristic.push(retrieveHeuristicCost(grid[row][col], endTile));
        }
        // add the heuristic of current row to total heuristic cost
        heuristicCost.push(rowHeuristic);
    }
    // return the 2D array of heuristic cost
    return heuristicCost;
};

// Helper function to retrieve the heuristic cost of given tile
export const retrieveHeuristicCost = (tile: TileType, endTile: TileType) => {
    // a constant multiplier for manhatten distance
    const manhattenMultiplier = 1;
    // Calculate the absolute difference in rows between the current tile and the end tile
    const row = Math.abs(tile.row - endTile.row);
    // Calculate the absolute difference in cols between the current tile and the end tile
    const col = Math.abs(tile.col - endTile.col);
    // return the manhatten distance
    return manhattenMultiplier * (row + col);
};

// Helper function to initialize the Function cost [ f(n) ] for A-star
export const initFunctionCost = () => {
    // an 2D array to store all the function cost
    const functionCost = [];
    // loop over each row of grid
    for (let row = 0; row < MAX_COLS; row++) {
        // array to store the function cost of each row
        const rowFunction = [];
        // loop over each col of grid
        for (let col = 0; col < MAX_COLS; col++) {
            // set initial funcitonal cost to infinity
            rowFunction.push(Infinity);
        }
        // add the function cost of current row to total function cost
        functionCost.push(rowFunction);
    }
    // return 2D array of function cost
    return functionCost;
};