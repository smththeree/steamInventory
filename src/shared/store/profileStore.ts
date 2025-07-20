import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import type { TUserData } from "../types/types";

type ProfileStore = {
  userData: TUserData | null;
  setUserData: (userData: TUserData) => void;
};

export const useProfileStore = create<ProfileStore>()(
  devtools(
    persist(
      (set) => ({
        userData: null,
        setUserData: (userData) => set({ userData }),
      }),
      {
        name: "profile-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
