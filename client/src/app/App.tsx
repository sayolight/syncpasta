import { RouterProvider } from "react-router";
import router from "@/app/router.tsx";
import "@/app/i18n";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
