// Import custom types
import type { GridType, TileType } from "../../../utils/type";

// Import custom helper functions
import { getNonWallNeighbours, isEqualTile } from "../../../utils/helper-functions";

// Import custom constants
import { MAX_ROWS, MAX_COLS } from "../../../utils/constant";

// function to execute the bellman-ford traversal algorithm for visualization
export const bellmanFord = (
    grid: GridType,
    startTile: TileType,
    endTile: TileType
) => {
    // An array to store the traversed tiles
    const traversedTiles: TileType[] = [];
    // Total no. of vertices in the grid
    const V = MAX_ROWS * MAX_COLS;

    // reset the grid state
    for (let row = 0; row < MAX_ROWS; row++) {
        for (let col = 0; col < MAX_COLS; col++) {
            const tile = grid[row][col];
            tile.distance = Infinity;
            tile.parent = null;
            tile.isTraversed = false;
            tile.isPath = false;
        }
    }

    // Get the starting tile from the grid
    const start = grid[startTile.row][startTile.col];
    // set the distance of start tile to be 0
    start.distance = 0;
    // mark the start tile as traversed
    start.isTraversed = true;
    // push the start tile into traversed list
    traversedTiles.push(start);

    // Queue for storing tiles that need processing
    const queue: TileType[] = [start];
    // Use a Set to track which tiles are currently in queue (by "row,col" key)
    const inQueue = new Set<string>();
    inQueue.add(`${start.row},${start.col}`);

    let count = 0;
    // flag to break out early when end is settled
    let foundEnd = false;

    // Relax the edges based on queue (SPFA style)
    while (queue.length > 0 && count < V - 1 && !foundEnd) {
        count++;
        const size = queue.length;

        for (let i = 0; i < size; i++) {
            const tile = queue.shift()!;
            inQueue.delete(`${tile.row},${tile.col}`);

            const neighbours = getNonWallNeighbours(grid, tile);
            for (const neighbour of neighbours) {
                const newDist = tile.distance + 1;

                // Found shorter path to neighbor
                if (newDist < neighbour.distance) {
                    neighbour.distance = newDist;
                    neighbour.parent = tile;

                    // Record first-time traversal for visualization
                    if (!neighbour.isTraversed) {
                        neighbour.isTraversed = true;
                        traversedTiles.push(neighbour);
                    }

                    const key = `${neighbour.row},${neighbour.col}`;
                    // Add to queue if not already present
                    if (!inQueue.has(key)) {
                        queue.push(neighbour);
                        inQueue.add(key);
                    }

                    // ** EARLY EXIT: if we've settled the endTile, stop further processing **
                    if (isEqualTile(neighbour, endTile)) {
                        foundEnd = true;
                        break;
                    }
                }
            }

            if (foundEnd) break;
        }
    }

    // detect negative cycle (unlikely in non-negative grid)
    // const hasNegativeCycle = detectNegativeCycle(grid);

    // an array to store the path
    const path: TileType[] = [];
    // only build the path if end is reachable
    const target = grid[endTile.row][endTile.col];
    if ( target.distance !== Infinity) {
        let tile: TileType | null = target;
        // Backtrack until the start tile (parent == null)
        while (tile !== null) {
            tile.isPath = true;
            path.unshift(tile);
            tile = tile.parent!;
        }
    }

    // return the traversed tiles along with path
    return { traversedTiles, path };
};
