import api from "./axios-instance";

export const auth = () => api.get("/auth/steam");

export const profile = (steamId: string) => api.get(`/profile/${steamId}`);

export const inventory = (
  steamId: string,
  appId: string,
  contextId: string,
  count: number = 100
) =>
  api.get(
    `/inventory/${steamId}/${appId}/${contextId}?lang=english&count=${count}`
  );
