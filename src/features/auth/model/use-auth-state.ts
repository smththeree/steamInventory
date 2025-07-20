export const useAuthState = () => {
  const loginLink = "http://localhost:3000/auth/steam";
  const handleLogin = () => {
    window.location.href = loginLink;
  };
  return {
    handleLogin,
  };
};
