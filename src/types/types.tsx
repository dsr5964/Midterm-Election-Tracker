import type {
  SAFE_D,
  SAFE_R,
  LIKELY_D,
  LIKELY_R,
  LEAN_D,
  LEAN_R,
  TILT_D,
  TILT_R,
  TOSSUP,
  SAFE_D_COLOR,
  SAFE_R_COLOR,
  LIKELY_D_COLOR,
  LIKELY_R_COLOR,
  LEAN_D_COLOR,
  LEAN_R_COLOR,
  TILT_D_COLOR,
  TILT_R_COLOR,
  TOSSUP_COLOR,
} from "../constants";

export type StateAbbr =
  | "AL"
  | "AK"
  | "AZ"
  | "AR"
  | "CA"
  | "CO"
  | "CT"
  | "DE"
  | "FL"
  | "GA"
  | "HI"
  | "ID"
  | "IL"
  | "IN"
  | "IA"
  | "KS"
  | "KY"
  | "LA"
  | "ME"
  | "MD"
  | "MA"
  | "MI"
  | "MN"
  | "MS"
  | "MO"
  | "MT"
  | "NE"
  | "NV"
  | "NH"
  | "NJ"
  | "NM"
  | "NY"
  | "NC"
  | "ND"
  | "OH"
  | "OK"
  | "OR"
  | "PA"
  | "RI"
  | "SC"
  | "SD"
  | "TN"
  | "TX"
  | "UT"
  | "VT"
  | "VA"
  | "WA"
  | "WV"
  | "WI"
  | "WY";

export type State = {
  id: string;
  abbrev: StateAbbr | undefined;
  name: string;
  rating: string;
  candidates: Candidate[];
  incumbent: Incumbent | undefined;
  flip: boolean;
};

export type PoliticalParty = "D" | "R" | "I";

export type NominationStatus =
  | "primary-tbd"
  | "nominee"
  | "incumbent"
  | "primary-runoff";

export type Candidate = {
  name: string;
  party: PoliticalParty;
  isIncumbent: boolean;
  status: NominationStatus;
};

export type PartyGroup = {
  party: string;
  candidates: Candidate[];
  isPrimary: boolean;
};

export type Incumbent = {
  name: string;
  party: PoliticalParty;
  retiring: boolean;
  firstElected: string;
  note: string;
  vacant: boolean;
};

export const PARTY_LABELS: Record<string, string> = {
  D: "Democrat",
  R: "Republican",
  I: "Independent",
};

export type Rating = {
  rating:
    | typeof SAFE_D
    | typeof SAFE_R
    | typeof LIKELY_D
    | typeof LIKELY_R
    | typeof LEAN_D
    | typeof LEAN_R
    | typeof TILT_D
    | typeof TILT_R
    | typeof TOSSUP;
  color:
    | typeof SAFE_D_COLOR
    | typeof SAFE_R_COLOR
    | typeof LIKELY_D_COLOR
    | typeof LIKELY_R_COLOR
    | typeof LEAN_D_COLOR
    | typeof LEAN_R_COLOR
    | typeof TILT_D_COLOR
    | typeof TILT_R_COLOR
    | typeof TOSSUP_COLOR;
};
