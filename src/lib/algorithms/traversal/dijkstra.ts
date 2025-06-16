// Import custom types
import type { GridType, TileType } from "../../../utils/type";

// Import custom helper functions
import { getUntraversedNeighbours, dropFromQueue, isEqualTile } from "../../../utils/helper-functions";

// function to execute the dijkstra traversal algorithm for visualization
export const dijkstra = (
    grid: GridType,
    startTile: TileType,
    endTile: TileType
) => {
    // An array to store the traversed tiles
    const traversedTiles: TileType[] = [];
    // Get the starting tile from the grid
    const start = grid[startTile.row][startTile.col];
    // set the distance of start tile to be 0
    start.distance = 0;
    // mark the start tile as traversed
    start.isTraversed = true;

    // initialize a stack with start tile
    const untraversed: TileType[] = [start];

    // loop untill there are untraversed tiles present
    while (untraversed.length) {
        // sort the queue by distance
        untraversed.sort((a, b) => a.distance - b.distance);
        // get the tile with the smallest distance
        const tile = untraversed.shift();
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
                // check for a shorter path
                if (tile.distance + 1 < neighbour.distance) {
                    // remove the neighbour from the queue
                    dropFromQueue(neighbour, untraversed);
                    // update the distance of neighbour tile
                    neighbour.distance = tile.distance + 1;
                    // set the neighbour tile's parent to current tile
                    neighbour.parent = tile;
                    // add the neighbour to untraversed queue
                    untraversed.push(neighbour);
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