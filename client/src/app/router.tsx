import { createBrowserRouter } from "react-router";
import MainPage from "@/pages/Main/MainPage.tsx";
import { Layout } from "@/app/layout/Layout.tsx";
import AuthPage from "@pages/Auth/AuthPage.tsx";
import ApplicationsPage from "@pages/Applications/ApplicationsPage.tsx";
import { ErrorBoundary } from "@pages/ErrorBoundary/ErrorBoundary.tsx";
import GalleryPage from "@pages/Gallery/GalleryPage.tsx";
import AccountPage from "@pages/Account/AccountPage.tsx";
import PasswordResetPage from "@pages/Account/PasswordResetPage.tsx";
import { AuthRoute } from "@/app/layout/AuthRoute.tsx";

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
        element: <AuthRoute />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: "/account",
            element: <AccountPage />,
          },
          {
            path: "/applications",
            element: <ApplicationsPage />,
          },
          {
            path: "/gallery",
            element: <GalleryPage />,
          },
        ],
      },
      {
        path: "/account/password-reset",
        element: <PasswordResetPage />,
      },
    ],
  },
]);

export default router;
