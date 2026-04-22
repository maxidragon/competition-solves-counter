import type { ApiCompetition, Wcif } from "./types";

const WCA_ORIGIN = "https://www.worldcubeassociation.org";

export const wcaApiRequest = (path: string, token?: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  return fetch(`${WCA_ORIGIN}/api/v0${path}`, {
    method: "GET",
    headers: headers,
    redirect: "follow",
  });
};

const wcaApiFetch = async <T>(path: string): Promise<T> => {
  const response = await wcaApiRequest(path);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const fetchSearchCompetition = async (
  search: string,
): Promise<ApiCompetition[]> => {
  const data = await wcaApiFetch<{ result: ApiCompetition[] }>(
    `/search/competitions?q=${encodeURIComponent(search)}`,
  );
  return data.result;
};

export const fetchWcif = async (competitionId: string): Promise<Wcif> => {
  const response = await fetch(
    `${WCA_ORIGIN}/api/v0/competitions/${competitionId}/wcif/public`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch WCIF: ${response.status}`);
  }
  return response.json();
};
