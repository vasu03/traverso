// Import required modules

// Import custom context providers
import { TraversalProvider } from "./contexts/TraversalContext";
import { TileProvider } from "./contexts/TileContext";
import { SpeedProvider } from "./contexts/SpeedContext";

// An React application
const App = () => {
	return (
		<TraversalProvider>
			<TileProvider>
				<SpeedProvider>
					<div className="text-3xl font-bold text-sky-500">Traverso</div>
				</SpeedProvider>
			</TileProvider>
		</TraversalProvider>
	);
};

// Export the application
export default App;