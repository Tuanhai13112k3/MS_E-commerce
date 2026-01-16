import { useAuth } from "@/features/auth/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (allowedRoles && user && !allowedRoles.includes(user.role as AvailableRoles)) {
        return <Navigate to="/403" replace />;
    }
    return <Outlet />
}
export default ProtectedRoute;