// Define the Type for various algorithms to be used for visualisation
export type AlgorithmType = "DIJKSTRA" | "BFS" | "DFS" | "A_START";

// Define the Type for traversal Maze
export type MazeType = "NONE" | "RECURSIVE_DIVISION" | "BINARY_TREE";

// Define the Type for the Tiles in the maze grid
export type TileType = {
    row: number;
    col: number;
    isEnd: boolean;
    isWall: boolean;
    distance: number;
    isStart: boolean;
    parent: TileType | null;
};

// Define the Type for Grid 
export type GridType = TileType[][];

// Define the Type for Speed (SLOW, MEDIUM, FAST)
export type SpeedType = 2 | 1 | 0.5;