import Home from "pages/Home";
import RouteError from "components/Error/RouteError";
import { Mutable } from "types/UtilityTypes";
import { RouteObject } from "react-router";

const ROUTES = [
  {
    path: "/",
    element: <Home />,
    errorElement: <RouteError />,
    id: "Home",
  },
  //...
] as const;

export const routes = [...ROUTES] as Mutable<typeof ROUTES> as RouteObject[];

type RouteID = (typeof ROUTES)[number]["id"];
type RoutePath = (typeof ROUTES)[number]["path"];

type RoutePaths = {
  [key in RouteID]: RoutePath;
};

export const routePaths: RoutePaths = Object.fromEntries(
  ROUTES.map((route) => [route.id, route.path])
) as RoutePaths;
