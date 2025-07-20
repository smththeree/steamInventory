import { profile } from "@/shared/api/queries";
import { ROUTES } from "@/shared/model/routes";

import { useProfileStore } from "@/shared/store/profileStore";
import type { DTOUserData, TUserData } from "@/shared/types/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
const RedirectHandler = () => {
  const setUserData = useProfileStore((state) => state.setUserData);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const steamId = searchParams.get("steamId");

  if (!steamId) throw new Error("SteamID not found");

  const { data, isSuccess } = useQuery<DTOUserData, Error, TUserData>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await profile(steamId);
      return res.data;
    },
    select: (data) => ({
      steamId: data.steamid,
      name: data.personaname,
      avatar: data.avatarfull,
      profileUrl: data.profileurl,
    }),
  });

  useEffect(() => {
    if (data) {
      setUserData(data);
      navigate(ROUTES.PROFILE);
    }
  }, [isSuccess, data, navigate, setUserData]);
  return null;
};

export default RedirectHandler;
