import { RouteObject } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
];
