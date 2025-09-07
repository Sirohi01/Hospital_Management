import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./RoutesEnum";

export default function PublicRoute({ isAuthenticated }) {
    return !isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.DASHBOARD} />;
}
