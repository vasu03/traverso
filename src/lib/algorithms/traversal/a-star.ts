// Import custom types
import type { GridType, TileType } from "../../../utils/type";

// Import custom helper functions
import { dropFromQueue, getUntraversedNeighbours, initFunctionCost, initHeuristicCost, isEqualTile } from "../../../utils/helper-functions";

// function to execute the a-star traversal algorithm for visualization
export const aStar = (
    grid: GridType,
    startTile: TileType,
    endTile: TileType
) => {
    // An array to store the traversed tiles
    const traversedTiles: TileType[] = [];
    // initialize the heuristic cost for each tile
    const heuristicCost = initHeuristicCost(grid, endTile);
    // initialize the functional cost for each tile
    const functionCost = initFunctionCost();

    // Get the starting tile from the grid
    const start = grid[startTile.row][startTile.col];
    // set the distance of start tile to be 0
    start.distance = 0;
    // calculate the initial function cost for start tile
    functionCost[start.row][start.col] = start.distance + heuristicCost[start.row][start.col];
    // mark the start tile as traversed
    start.isTraversed = true;

    // initialize a queue with start tile to record untraversed tiles
    const untraversedTiles: TileType[] = [start];

    // loop untill there are untraversed tiles present
    while (untraversedTiles.length > 0) {
        // sort the queue
        untraversedTiles.sort((a, b) => {
            // if the functional cost is equal then sort by distance
            if (functionCost[a.row][a.col] === functionCost[b.row][b.col]) {
                return b.distance - a.distance;
            } else {
                return functionCost[a.row][a.col] - functionCost[b.row][b.col];
            }
        });
        // get the current tile with the smalles functional cost
        const tile = untraversedTiles.shift();
        // if the tile is available then
        if (tile) {
            // skip if the tile is a Wall
            if (tile.isWall) continue;
            // break if tile has a infinity distance
            if (tile.distance === Infinity) break;
            // mark the tile as traversed
            tile.isTraversed = true;
            // add the tile to traversed tiles list
            traversedTiles.push(tile);
            // break if the tile is an end-tile
            if (isEqualTile(tile, endTile)) break;

            // Get the untraversed neighbours of the tile
            const untraversedNeighbours = getUntraversedNeighbours(grid, tile);
            for (let i = 0; i < untraversedNeighbours.length; i++) {
                // get the neighbour tile
                const neighbour = untraversedNeighbours[i];
                // calculate the distance to neighbour
                const distanceToNeighbour = tile.distance + 1;
                // check for a shorter path
                if (distanceToNeighbour < neighbour.distance) {
                    // remove the neighbour from the queue
                    dropFromQueue(neighbour, untraversedTiles);
                    // update the distance of neighbour tile
                    neighbour.distance = distanceToNeighbour;
                    // update the functional cost of neighbour
                    functionCost[neighbour.row][neighbour.col] = neighbour.distance + heuristicCost[neighbour.row][neighbour.col];
                    // set the neighbour tile's parent to current tile
                    neighbour.parent = tile;
                    // add the neighbour to untraversed queue
                    untraversedTiles.push(neighbour);
                }
            }
        }
    }

    // Build the path if valid
    // an array to store the path
    const path = [];
    // start from the end tile of the grid
    let tile = grid[endTile.row][endTile.col];
    // only build the path if end tile is reached
    if (endTile.distance !== Infinity) {
        // Backtrack until the start tile
        while (tile !== null) {
            // mark the tile as a part of traversal path
            tile.isPath = true;
            // add the tile to the path
            path.unshift(tile);
            // move to the parent tile
            tile = tile.parent!;
        }
    }

    // return the traversed tiles along with path
    return { traversedTiles, path };
};