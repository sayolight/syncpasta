import { createBrowserRouter } from "react-router";
import MainPage from "@/pages/Main/MainPage.tsx";
import { Layout } from "@/app/layout/Layout.tsx";
import AuthPage from "@pages/Auth/AuthPage.tsx";
import ApplicationsPage from "@pages/Applications/ApplicationsPage.tsx";
import { ErrorBoundary } from "@pages/ErrorBoundary/ErrorBoundary.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/applications",
        element: <ApplicationsPage />,
      },
    ],
  },
]);

export default router;
