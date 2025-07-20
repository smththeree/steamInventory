import { useIsAuth } from "@/shared/hooks/isAuth";
import { ROUTES } from "@/shared/model/routes";

import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const isAuth = useIsAuth();

  if (!isAuth) return <Navigate to={ROUTES.LOGIN} />;
  return <Outlet />;
};
