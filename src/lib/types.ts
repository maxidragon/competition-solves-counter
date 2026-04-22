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
    best: number;
    type: string;
    worldRanking: number;
    continentalRanking: number;
    nationalRanking: number;
  }[];
}

export interface WcifAttempt {
  result: number;
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
  format: string;
  timeLimit: unknown;
  cutoff: unknown;
  advancementCondition: unknown;
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
