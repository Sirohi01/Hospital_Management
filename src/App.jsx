import { Routes, Route, Navigate } from "react-router-dom";
import { routesConfig } from "./components/routes/routesConfig";
import PrivateRoute from "./components/routes/PrivateRoutes";
import PublicRoute from "./components/routes/PublicRoutes";
import { ROUTES } from "./components/routes/RoutesEnum";

export default function App() {
  const isAuthenticated = true;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />

      {routesConfig.map((route) => {
        const Element = route.element;
        const Layout = route.layout || (({ children }) => <>{children}</>);

        if (route.type === "public") {
          return (
            <Route
              key={route.path}
              element={<PublicRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path={route.path} element={<Element />} />
            </Route>
          );
        }

        if (route.type === "private") {
          return (
            <Route
              key={route.path}
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route element={<Layout />}>
                <Route path={route.path} element={<Element />} />
              </Route>
            </Route>
          );
        }

        return null;
      })}
    </Routes>
  );
}
