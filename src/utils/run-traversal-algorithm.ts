// Import custom types
import type { AlgorithmType, GridType, TileType } from "./type";

// Import custom Algorithmic functions
import { bfs } from "../lib/algorithms/traversal/breadth-first-search";
import { dfs } from "../lib/algorithms/traversal/depth-first-search";

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
        case "DFS": {
            return dfs(grid, startTile, endTile);
        }
        default: {
            return bfs(grid, startTile, endTile);
        }
    }
};