import type {
  InventoryItem,
  SteamAsset,
  SteamDescription,
} from "../types/types";

export function mapAssetsToItems(
  assets: SteamAsset[],
  descriptions: SteamDescription[]
): InventoryItem[] {
  const makeKey = (classid: string, instanceid: string) =>
    `${classid}_${instanceid}`;
  const descriptionsMap = new Map<string, SteamDescription>(
    descriptions.map((d) => [makeKey(d.classid, d.instanceid), d])
  );

  return assets.map((asset) => {
    const desc = descriptionsMap.get(makeKey(asset.classid, asset.instanceid));
    return {
      id: crypto.randomUUID(),
      assetid: asset.assetid,
      name: desc?.market_hash_name || "Unknown",
      imageUrl: desc?.icon_url
        ? `https://steamcommunity-a.akamaihd.net/economy/image/${desc.icon_url}`
        : "",
      amount: Number(asset.amount),
    };
  });
}
