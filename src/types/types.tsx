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
  abbrev: StateAbbr;
  name: string;
  rating: string;
  candidates: Candidate[];
  incumbent: Incumbent;
};

export type PoliticalParty = "D" | "R" | "I";

export type Candidate = {
  name: string;
  politicalParty: PoliticalParty;
  status: string;
  isIncumbent: boolean;
};

export type Incumbent = {
  name: string;
  politicalParty: PoliticalParty;
  retiring: boolean;
  firstElected: string;
  note: string;
  vacant: boolean;
};
