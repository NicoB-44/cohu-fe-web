import { RouteObject } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const BASE_PATH = "/cohu-fe-web/";

export const routes: RouteObject[] = [
  {
    path: BASE_PATH,
    element: <Home />,
    errorElement: <NotFound />,
  },
];
