// Import required modules
import { createContext, useState, type ReactNode } from "react";

// Import custom types 
import type { AlgorithmType, GridType, MazeType } from "../utils/type";

// Import custom constants
import { END_TILE_CONFIG, START_TILE_CONFIG } from "../utils/constant";

// Import custom helper functions
import { createGrid } from "../utils/helper-functions";

// Define the interface for Traversal Context
interface TraversalContextInterface {
    algorithm: AlgorithmType;
    setAlgorithm: (algorithm: AlgorithmType) => void;
    maze: MazeType;
    setMaze: (maze: MazeType) => void;
    grid: GridType;
    setGrid: (grid: GridType) => void;
    isGraphVisualized: boolean;
    setIsGraphVisualized: (isGraphVisualized: boolean) => void;
};

// A context for Traversal
export const TraversalContext = createContext<TraversalContextInterface | undefined>(undefined);

// A context provider for Traversal
export const TraversalProvider = ({ children }: { children: ReactNode }) => {
    const [algorithm, setAlgorithm] = useState<AlgorithmType>("BFS");
    const [maze, setMaze] = useState<MazeType>("NONE");
    const [grid, setGrid] = useState<GridType>(createGrid(START_TILE_CONFIG, END_TILE_CONFIG));
    const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);

    return (
        <TraversalContext.Provider value={{ algorithm, setAlgorithm, maze, setMaze, grid, setGrid, isGraphVisualized, setIsGraphVisualized }}>
            {children}
        </TraversalContext.Provider>
    );
};