import { Navigate, RouteObject } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RegionProvider from "@PROVIDERS/RegionProvider";
import { DEFAULT_REGION } from "@CONSTANTS/regions";

export const routes: RouteObject[] = [
{
    path: "/",
    element: <Navigate to={`/${DEFAULT_REGION}`} replace />,
  },
  {
    path: "/:region",
    element: (
      <RegionProvider>
        <Home />
      </RegionProvider>
    ),
    errorElement: <NotFound />,
  },
];
