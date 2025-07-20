import { Button } from "@/shared/ui/button";
import { useAuthState } from "../model/use-auth-state";

const LoginPage = () => {
  const { handleLogin } = useAuthState();

  return (
    <div className="flex h-screen items-center justify-center">
      <Button variant={"default"} onClick={handleLogin}>
        Login via Steam
      </Button>
    </div>
  );
};

export default LoginPage;
