// Import required modules
import { twMerge } from "tailwind-merge";

// Import custom constants
import { BASE_TILE_STYLE, END_TILE_STYLE, MAX_ROWS, PATH_TILE_STYLE, START_TILE_STYLE, TRAVERSED_TILE_STYLE, WALL_TILE_STYLE } from "../utils/constant";

// Define the props for Tile component
interface TileProps {
    row: number,
    col: number,
    isStart: boolean,
    isEnd: boolean,
    isTraversed: boolean,
    isWall: boolean,
    isPath: boolean
    handleMousePressed: (row: number, col: number) => void,
    handleMouseReleased: (row: number, col: number) => void,
    handleMouseEnter: (row: number, col: number) => void,
};

// A component to render individual tile on grid
export const Tile = ({ row, col, isStart, isEnd, isTraversed, isWall, isPath, handleMousePressed, handleMouseReleased, handleMouseEnter }: TileProps) => {
    // Stylings for the Tile component based on its type
    let tile_style_type;
    if (isStart) tile_style_type = START_TILE_STYLE;
    else if (isEnd) tile_style_type = END_TILE_STYLE;
    else if (isTraversed) tile_style_type = TRAVERSED_TILE_STYLE;
    else if (isWall) tile_style_type = WALL_TILE_STYLE;
    else if (isPath) tile_style_type = PATH_TILE_STYLE;
    else tile_style_type = BASE_TILE_STYLE;

    // Styling for borders & edges based on its type
    const border_style = (row === MAX_ROWS - 1 ? 'border-b' : col === 0 ? "border-l" : "");
    const edge_Style = (row === MAX_ROWS - 1 && col === 0 ? "border-l" : "");

    // TSX to render the component 
    return (
        <div
            onMouseDown={() => handleMousePressed(row, col)}
            onMouseUp={() => handleMouseReleased(row, col)}
            onMouseEnter={() => handleMouseEnter(row, col)}
            className={twMerge(tile_style_type, border_style, edge_Style)}
            id={`${row}-${col}`}
        />
    );
};