// Import custom types
import type { AlgorithmType, GridType, TileType } from "./type";

// Import custom Algorithmic functions
import { bfs } from "../lib/algorithms/traversal/breadth-first-search";

// function to start execution of traversal algorithm as selected
export const runTraversalAlgorithm = (
    algorithm: AlgorithmType,
    grid: GridType,
    startTile: TileType,
    endTile: TileType
) => {
    switch (algorithm) {
        case "BFS": {
            return bfs(grid, startTile, endTile);
        }
        default: {
            return bfs(grid, startTile, endTile);
        }
    }
};