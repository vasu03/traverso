// Import required modules
import { createContext, useState, type ReactNode } from "react";

// Import custom types 
import type { SpeedType } from "../utils/type";

// Define the interface for Speed context
interface SpeedContextInterface {
    speed: SpeedType;
    setSpeed: (speed: SpeedType) => void;
};

// A context for Speed
export const SpeedContext = createContext<SpeedContextInterface | undefined>(undefined);

// A context provider for Speed
export const SpeedProvider = ({ children }: { children: ReactNode }) => {
    const [speed, setSpeed] = useState<SpeedType>(1);

    return (
        <SpeedContext.Provider value={{ speed, setSpeed }}>
            {children}
        </SpeedContext.Provider>
    );
};