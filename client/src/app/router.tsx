import { createBrowserRouter } from "react-router";
import MainPage from "@/pages/Main/MainPage.tsx";
import { Layout } from "@/app/layout/Layout.tsx";
import AuthPage from "@pages/Auth/AuthPage.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },
]);

export default router;
