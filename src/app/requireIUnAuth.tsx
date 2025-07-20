import { useIsAuth } from "@/shared/hooks/isAuth";
import { ROUTES } from "@/shared/model/routes";
import { Navigate } from "react-router";

const RequireUnauth = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useIsAuth();

  if (isAuth) {
    return <Navigate to={ROUTES.PROFILE} replace />;
  }

  return children;
};

export default RequireUnauth;
