type AvailableRoles = "admin" | "customer";
type ProtectedRouteProps = {
  allowedRoles?: AvailableRoles[];
};
