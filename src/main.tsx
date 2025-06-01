// Import required modules
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import our React Application
import App from "./App.tsx";

// Import custom CSS stylings
import "./index.css";

// Create & Render a single page application
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
