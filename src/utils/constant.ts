// Import custom types
import type { MazeSelectType, SpeedSelectType } from "./type";

// Maximmum number of rows & cols in the grid
export const MAX_ROWS: number = 39;
export const MAX_COLS: number = 49;

// Configs for a START_TILE on grid
export const START_TILE_CONFIG = {
    row: 1,
    col: 1,
    isWall: false,
    isPath: false,
    parent: null,
    distance: 0,
    isEnd: false,
    isStart: false,
    isTraversed: false,
};

// Configs for a END_TILE on grid
export const END_TILE_CONFIG = {
    row: MAX_ROWS - 2,
    col: MAX_COLS - 2,
    isWall: false,
    isPath: false,
    parent: null,
    distance: 0,
    isEnd: false,
    isStart: false,
    isTraversed: false,
};

// Tailwind styling for the tiles on grid
export const BASE_TILE_STYLE = ("lg:w-[17px] md:w-[14px] sm:w-[12px] w-[10px] lg:h-[17px] md:h-[14px] sm:h-[12px] h-[10px] border-t border-r border-slate-400/80 ");

export const START_TILE_STYLE = BASE_TILE_STYLE + ("bg-green-500 !border-green-500");
export const END_TILE_STYLE = BASE_TILE_STYLE + ("bg-red-500 !border-red-500");
export const TRAVERSED_TILE_STYLE = BASE_TILE_STYLE + ("bg-cyan-400");
export const WALL_TILE_STYLE = BASE_TILE_STYLE + ("bg-gray-600/90");
export const PATH_TILE_STYLE = BASE_TILE_STYLE + ("bg-teal-600");

// Different types of MAZE available for visualization
export const SELECT_MAZE_LIST: MazeSelectType[] = [
    { name: "No Maze", value: "NONE" },
    { name: "Binary Tree", value: "BINARY_TREE" },
    { name: "Recursive Division", value: "RECURSIVE_DIVISION" }
];

// Level of speeds for visualization
export const SELECT_SPEED_LIST: SpeedSelectType[] = [
    { name: "SLOW", value: 2 },
    { name: "MEDIUM", value: 1 },
    { name: "FAST", value: 0.5 },
];

export const SLEEP_TIME = 8;
export const EXTENDED_SLEEP_TIME = 30;