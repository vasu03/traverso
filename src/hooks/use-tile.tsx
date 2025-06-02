// Import required modules
import { useContext } from "react";

// Import custom contexts
import { TileContext } from "../contexts/TileContext";

// A custom hook to get access to TileContext and ensure always used under TileProvider
export const useTile = () => {
    // get the Tile Context
    const context = useContext(TileContext);

    // check if context does not exist
    if (!context) {
        throw new Error("useTile must be used within a TileProvider");
    }

    // return the context
    return context;
}; 