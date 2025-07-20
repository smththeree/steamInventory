import { inventory } from "@/shared/api/queries";
import { useProfileStore } from "@/shared/store/profileStore";
import type { SteamInventoryResponse } from "@/shared/types/types";
import { mapAssetsToItems } from "@/shared/utils/mapAssetsToDesc";
import { useQuery } from "@tanstack/react-query";

export const useInventoryState = () => {
  const userData = useProfileStore((state) => state.userData);
  if (!userData) throw new Error("User data not found");
  const { data } = useQuery<
    SteamInventoryResponse,
    Error,
    SteamInventoryResponse
  >({
    queryKey: ["inventory"],
    queryFn: async () => {
      const res = await inventory(userData?.steamId, "730", "2");
      return res.data;
    },
  });
  const items = mapAssetsToItems(data?.assets || [], data?.descriptions || []);
  return {
    items,
  };
};
