import { inventory } from "@/shared/api/queries";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver";
import { useProfileStore } from "@/shared/store/profileStore";
import type { SteamInventoryResponse } from "@/shared/types/types";
import { mapAssetsToItems } from "@/shared/utils/mapAssetsToDesc";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";

export const useInventoryState = (appId: string) => {
  const userData = useProfileStore((state) => state.userData);
  if (!userData) throw new Error("User data not found");
  const ref = useRef<HTMLSpanElement | null>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.5 });
  const [count, setCount] = useState(25);

  useEffect(() => {
    if (isIntersecting) {
      setCount((prev) => prev + 10);
    }
  }, [isIntersecting]);

  const { data, isPending, isFetching } = useQuery<
    SteamInventoryResponse,
    Error,
    SteamInventoryResponse
  >({
    queryKey: ["inventory", userData?.steamId, appId, count],
    queryFn: async () => {
      const res = await inventory(userData?.steamId, appId, "2", count);
      return res.data;
    },
  });
  const items = useMemo(
    () => mapAssetsToItems(data?.assets || [], data?.descriptions || []),
    [data]
  );

  return {
    items,
    isPending,
    isFetching,
    ref,
  };
};
