import { createBrowserRouter } from "react-router";
import App from "./App";
import { ROUTES } from "@/shared/model/routes";
import LoginPage from "@/features/auth/ui/loginPage";
import Providers from "./providers";
import ProfilePage from "@/features/profile/ui/profilePage";
import RedirectHandler from "@/features/profile/ui/setUserData";
import { ProtectedRoute } from "./ProtectedRoute";
import RequireUnauth from "./requireIUnAuth";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.HOME,
            element: <h1>Home</h1>,
          },
          {
            path: ROUTES.PROFILE,
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <>
            <RequireUnauth>
              <LoginPage />
            </RequireUnauth>
          </>
        ),
      },
      {
        path: ROUTES.USERAUTH,
        element: <RedirectHandler />,
      },
    ],
  },
]);
