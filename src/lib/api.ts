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

// Pinned to the v2 major version: `/wcif/latest` will move to v3, and the
// unversioned `/wcif/public` still serves v1, which the WCA is deprecating.
const WCIF_MAJOR_VERSION = 2;

export const fetchWcif = async (competitionId: string): Promise<Wcif> => {
  const response = await fetch(
    `${WCA_ORIGIN}/api/v0/competitions/${competitionId}/wcif/version/${WCIF_MAJOR_VERSION}`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch WCIF: ${response.status}`);
  }
  const wcif: Wcif = await response.json();
  if (!wcif.formatVersion?.startsWith(`${WCIF_MAJOR_VERSION}.`)) {
    throw new Error(`Unsupported WCIF format version: ${wcif.formatVersion}`);
  }
  return wcif;
};
