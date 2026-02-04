import {createBrowserRouter} from "react-router";
import MainPage from "../pages/Main/MainPage.tsx";
import {Layout} from "./layout/Layout.tsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
            path: '/',
            element: <MainPage />
        }
        ]
    },
]);

export default router;