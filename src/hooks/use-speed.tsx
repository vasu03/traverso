// Import required modules
import { useContext } from "react";

// Import custom contexts
import { SpeedContext } from "../contexts/SpeedContext";

// A custom hook to get access to SpeedContext and ensure always used under SpeedProvider
export const useSpeed = () => {
    // get the Speed Context
    const context = useContext(SpeedContext);

    // check if context does not exist
    if (!context) {
        throw new Error("useSpeed must be used within a SpeedProvider");
    }

    // return the context
    return context;
}; 