// Import required modules
import { createContext, useState, type ReactNode } from "react";

// Import custom types 
import type { TileType } from "../utils/type";

// Import custom constants
import { END_TILE_CONFIG, START_TILE_CONFIG } from "../utils/constant";

// Define the interface for Tile Context
interface TileContextInterface {
    startTile: TileType;
    setStartTile: (startTile: TileType) => void;
    endTile: TileType;
    setEndTile: (endTile: TileType) => void;
};

// A context for Tiles
export const TileContext = createContext<TileContextInterface | undefined>(undefined);

// A context provider for Tiles
export const TileProvider = ({ children }: { children: ReactNode }) => {
    const [startTile, setStartTile] = useState<TileType>(START_TILE_CONFIG);
    const [endTile, setEndTile] = useState<TileType>(END_TILE_CONFIG);

    return (
        <TileContext.Provider value={{ startTile, setStartTile, endTile, setEndTile }}>
            {children}
        </TileContext.Provider>
    )
};