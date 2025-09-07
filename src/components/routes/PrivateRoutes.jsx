import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./RoutesEnum";

export default function PrivateRoute({ isAuthenticated }) {
    return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
}
