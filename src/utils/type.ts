// Define the Type for various algorithms to be used for visualisation
export type AlgorithmType = "DIJKSTRA" | "BELLMAN_FORD" | "BFS" | "DFS" | "A_STAR";

// An interface for Algorithm selection types
export interface AlgorithmSelectionType { name: string, value: AlgorithmType };

// Define the Type for traversal Maze
export type MazeType = "NONE" | "RECURSIVE_DIVISION" | "BINARY_TREE" | "HORIZONTAL_RECURSIVE_DIVISION" | "VERTICAL_RECURSIVE_DIVISION" | "LINKED_LADDER";

// An interface for Maze selection types
export interface MazeSelectType { name: string, value: MazeType };

// Define the Type for the Tiles in the maze grid
export type TileType = {
    row: number;
    col: number;
    isEnd: boolean;
    isWall: boolean;
    distance: number;
    isStart: boolean;
    isPath: boolean;
    isTraversed: boolean;
    parent: TileType | null;
};

// Define the Type for Grid 
export type GridType = TileType[][];

// Define the Type for Speed (SLOW, MEDIUM, FAST)
export type SpeedType = 2 | 1 | 0.5;

// An intrface for Speed Selection types
export interface SpeedSelectType { name: string, value: SpeedType };