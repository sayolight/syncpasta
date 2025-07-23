import { createBrowserRouter } from "react-router";
import { MainPage } from "../pages/main";
import { Layout } from "./layout";
import { Error404Page } from "../pages/error-404";
import { GalleryPage } from "../pages/gallery";

export const routes = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: "/",
        Component: MainPage,
      },
      {
        path: "/gallery",
        Component: GalleryPage,
      },
      {
        path: "*",
        Component: Error404Page,
      },
    ],
  },
]);
