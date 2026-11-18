import { RouterProvider } from "react-router";
import { router } from "../controllers/routes"; // Corrigido para buscar na pasta controllers!

export default function App() {
  return <RouterProvider router={router} />;
}
