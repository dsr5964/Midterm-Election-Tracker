import type { PoliticalParty, RatingConfig } from "./types/types";

export const SAFE_R = "safe-r";
export const SAFE_D = "safe-d";
export const LIKELY_R = "likely-r";
export const LIKELY_D = "likely-d";
export const LEAN_R = "lean-r";
export const LEAN_D = "lean-d";
export const TILT_R = "tilt-r";
export const TILT_D = "tilt-d";
export const SAFE_I = "safe-i";
export const LIKELY_I = "likely-i";
export const LEAN_I = "lean-i";
export const TILT_I = "tilt-";
export const TOSSUP = "tossup";
export const NO_RACE_COLOR = "#E5E5E0";
export const DEMOCRAT = "Democrat";
export const REPUBLICAN = "Republican";
export const INDEPENDENT = "Independent";

export const SAFE_D_COLOR = "#244999";
export const SAFE_R_COLOR = "#D22532";
export const LIKELY_D_COLOR = "#577CCC";
export const LIKELY_R_COLOR = "#FF5865";
export const LEAN_D_COLOR = "#8AAFFF";
export const LEAN_R_COLOR = "#FF8B98";
export const TILT_D_COLOR = "#949BB3";
export const TILT_R_COLOR = "#CF8980";
export const TOSSUP_COLOR = "#C9C09B";
// const SAFE_I_COLOR = "#9932CC";
// const LIKELY_I_COLOR = "#B86FDC";
// const LEAN_I_COLOR = "#D6ADEB";
// const TILT_I_COLOR = "#E8D8F2";

export const buttonNames: string[] = ["Senate", "Governor", "House"];

export const colorByRating: Record<string, string> = {
  [SAFE_D]: SAFE_D_COLOR,
  [LIKELY_D]: LIKELY_D_COLOR,
  [LEAN_D]: LEAN_D_COLOR,
  [TILT_D]: TILT_D_COLOR,
  [SAFE_R]: SAFE_R_COLOR,
  [LIKELY_R]: LIKELY_R_COLOR,
  [LEAN_R]: LEAN_R_COLOR,
  [TILT_R]: TILT_R_COLOR,
  [TOSSUP]: TOSSUP_COLOR,
};

export const colorFlipByParty: Record<string, string> = {
  [DEMOCRAT]: "#052fd6",
  [REPUBLICAN]: "#d60819",
};

export const ratingByParty: Record<string, RatingConfig[]> = {
  Democrat: [
    {
      rating: SAFE_D,
      color: SAFE_D_COLOR,
    },
    {
      rating: LIKELY_D,
      color: LIKELY_D_COLOR,
    },
    {
      rating: LEAN_D,
      color: LEAN_D_COLOR,
    },
    {
      rating: TILT_D,
      color: TILT_D_COLOR,
    },
  ],
  Republican: [
    {
      rating: SAFE_R,
      color: SAFE_R_COLOR,
    },
    {
      rating: LIKELY_R,
      color: LIKELY_R_COLOR,
    },
    {
      rating: LEAN_R,
      color: LEAN_R_COLOR,
    },
    {
      rating: TILT_R,
      color: TILT_R_COLOR,
    },
  ],
};

export const tossupConfig = { rating: TOSSUP, color: TOSSUP_COLOR };

export const PARTY_LABELS: Record<PoliticalParty, string> = {
  D: "Democrat",
  R: "Republican",
  I: "Independent",
};

export const ratingToValueMap: Record<string, number> = {
  [SAFE_D]: 3,
  [SAFE_R]: -3,
  [LIKELY_D]: 2,
  [LIKELY_R]: -2,
  [LEAN_D]: 1,
  [LEAN_R]: -1,
  [TILT_D]: 0.5,
  [TILT_R]: -0.5,
  [TOSSUP]: 0,
};

// TODO: is it better to use the actual rating for flips or just use either the same red or blue regardless
// of projected rating
export const stripeConfigs = {
  [SAFE_D]: { line: "#052fd6", background: colorByRating[SAFE_D] },
  [LIKELY_D]: { line: "#052fd6", background: colorByRating[LIKELY_D] },
  [LEAN_D]: { line: "#052fd6", background: colorByRating[LEAN_D] },
  [TILT_D]: { line: "#052fd6", background: colorByRating[TILT_D] },
  [SAFE_R]: { line: "#d60819", background: colorByRating[SAFE_R] },
  [LIKELY_R]: { line: "#d60819", background: colorByRating[LIKELY_R] },
  [LEAN_R]: { line: "#d60819", background: colorByRating[LEAN_R] },
  [TILT_R]: { line: "#d60819", background: colorByRating[TILT_R] },
  [SAFE_I]: { line: "#a95ff4", background: colorByRating[SAFE_I] },
  [LIKELY_I]: { line: "#a95ff4", background: colorByRating[LIKELY_I] },
  [LEAN_I]: { line: "#a95ff4", background: colorByRating[LEAN_I] },
  [TILT_I]: { line: "#a95ff4", background: colorByRating[TILT_I] },
};
