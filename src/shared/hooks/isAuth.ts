import { useProfileStore } from "../store/profileStore";

export const useIsAuth = () => {
  const userData = useProfileStore.getState().userData;
  return userData;
};
