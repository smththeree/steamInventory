export type DTOUserData = {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  commentpermission: number;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: number;
  primaryclanid: string;
  timecreated: number;
  personastateflags: number;
};

export type TUserData = {
  steamId: string;
  name: string;
  avatar: string;
  profileUrl: string;
};

export interface SteamAsset {
  assetid: string;
  classid: string;
  amount: string;
  instanceid: string;
}

export interface SteamDescription {
  classid: string;
  market_hash_name: string;
  icon_url: string;
  instanceid: string;
}

export interface SteamInventoryResponse {
  assets: SteamAsset[];
  descriptions: SteamDescription[];
  total_inventory_count: number;
  success: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  imageUrl: string;
  amount: number;
}
