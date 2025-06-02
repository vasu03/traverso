export const MAX_ROWS: number = 49;
export const MAX_COLS: number = 49;

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