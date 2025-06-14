// Import custom types
import type { GridType, TileType } from "../../../utils/type";

// Import custom helper functions
import { getUntraversedNeighbours, isEqualTile, isInQueue } from "../../../utils/helper-functions";

// function to execute the breadth-first-search traversal algorithm for visualization
export const bfs = (
    grid: GridType,
    startTile: TileType,
    endTile: TileType
) => {
    // An array to store the traversed tiles
    const traversedTiles: TileType[] = [];
    // Get the starting tile from the grid
    const base = grid[startTile.row][startTile.col];
    // set the distance of start tile to be 0
    base.distance = 0;
    // mark the start tile as traversed
    base.isTraversed = true;

    // initialize a queue with start tile
    const untraversed = [base];

    // loop untill there are untraversed tiles present
    while (untraversed.length) {
        // get the first tile from the queue
        const tile = untraversed.shift() as TileType;
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
            // check if the neighbour is not in untraversed queue
            if (!isInQueue(untraversedNeighbours[i], untraversed)) {
                // get the neighbour tile
                const neighbour = untraversedNeighbours[i];
                // set the distance of neighbour tile
                neighbour.distance = tile.distance + 1;
                // set the neighbour tile's parent to current tile
                neighbour.parent = tile;
                // add the neighbour to untraversed queue
                untraversed.push(neighbour);
            }
        }
    }

    // an array to store the path
    const path = [];
    // start from the end tile of grid
    let tile = grid[endTile.row][endTile.col];
    // Backtrack untill the start tile
    while (tile !== null) {
        // mark the tile as a part of traversal path
        tile.isPath = true;
        // add the tile to the path
        path.unshift(tile);
        // move to the parent tile
        tile = tile.parent!;
    }

    // return the traversed tiles along with path
    return { traversedTiles, path };
};