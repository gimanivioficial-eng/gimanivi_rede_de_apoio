import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css"; // Corrigido: tiramos um "../" porque a pasta styles está dentro de view

createRoot(document.getElementById("root")!).render(<App />);
