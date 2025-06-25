// Import required modules
import { useRef } from "react";

// Import custom context providers
import { TraversalProvider } from "./contexts/TraversalContext";
import { TileProvider } from "./contexts/TileContext";
import { SpeedProvider } from "./contexts/SpeedContext";

// Import custom components
import { Navbar } from "./components/Navbar";
import { Grid } from "./components/Grid";
import { Footer } from "./components/Footer";

// An React application
const App = () => {
	// a reference to check if the visualization process is still running or not
	const isVisualizationRunningRef = useRef<boolean>(false);

	return (
		<TraversalProvider>
			<TileProvider>
				<SpeedProvider>
					<main className="h-fit w-[98%] md:w-[95%] mx-auto max-w-screen flex flex-col">
						<Navbar isVisualizationRunningRef={isVisualizationRunningRef} />
						<Grid isVisualizationRunningRef={isVisualizationRunningRef} />
						<Footer />
					</main>
				</SpeedProvider>
			</TileProvider>
		</TraversalProvider>
	);
};

// Export the application
export default App;