// Import required modules
import { useContext } from "react";

// Import custom contexts
import { TraversalContext } from "../contexts/TraversalContext";

// A custom hook to get access to TraversalContext and ensure always used under TraversalProvider
export const useTraversal = () => {
    // get the Traversal Context
    const context = useContext(TraversalContext);

    // check if context does not exist
    if (!context) {
        throw new Error("useTraversal must be used within a TraversalProvider");
    }

    // return the context
    return context;
}; 