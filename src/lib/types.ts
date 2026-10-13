export interface ApiCompetition {
  id: string;
  name: string;
  city: string;
  country_iso2: string;
  start_date: string;
  end_date: string;
  competitor_limit: number;
  url: string;
}

export interface WcifPerson {
  name: string;
  wcaUserId: number;
  wcaId: string | null;
  registrantId: number | null;
  countryIso2: string;
  gender: string;
  registration: {
    wcaRegistrationId: number;
    eventIds: string[];
    status: string;
    guests: number;
    comments: string;
    administrativeNotes: string;
    isCompeting: boolean;
  } | null;
  avatar: {
    url: string;
    thumbUrl: string;
  } | null;
  roles: string[];
  assignments: unknown[];
  personalBests: {
    eventId: string;
    value: number;
    type: string;
    worldRanking: number;
    continentalRanking: number;
    nationalRanking: number;
  }[];
}

export interface WcifAttempt {
  value: number;
  reconstruction: string | null;
}

export interface WcifResult {
  personId: number;
  ranking: number | null;
  attempts: WcifAttempt[];
  best: number;
  average: number;
}

export interface WcifRound {
  id: string;
  /** Rounds forming a Dual Round with this one (including itself), if any. */
  linkedRounds: string[] | null;
  format: "1" | "2" | "3" | "5" | "a" | "m" | "h";
  timeLimit: unknown;
  cutoff: unknown;
  participationRuleset: unknown;
  results: WcifResult[];
}

export interface WcifEvent {
  id: string;
  rounds: WcifRound[];
  competitorLimit: number | null;
  qualification: unknown;
}

export interface Wcif {
  formatVersion: string;
  id: string;
  name: string;
  shortName: string;
  persons: WcifPerson[];
  events: WcifEvent[];
  schedule: unknown;
  competitorLimit: number;
}
