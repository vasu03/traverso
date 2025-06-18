// Import custom types
import type { AlgorithmType, GridType, TileType } from "./type";

// Import custom Algorithmic functions
import { bfs } from "../lib/algorithms/traversal/breadth-first-search";
import { dfs } from "../lib/algorithms/traversal/depth-first-search";
import { dijkstra } from "../lib/algorithms/traversal/dijkstra";
import { bellmanFord } from "../lib/algorithms/traversal/bellman-ford";
import { aStar } from "../lib/algorithms/traversal/a-star";

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
        case "DIJKSTRA": {
            return dijkstra(grid, startTile, endTile);
        }
        case "BELLMAN_FORD": {
            return bellmanFord(grid, startTile, endTile);
        }
        case "A_STAR": {
            return aStar(grid, startTile, endTile);
        }
        default: {
            return bfs(grid, startTile, endTile);
        }
    }
};