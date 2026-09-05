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

export const colorByRating: Record<string, string> = {
  [SAFE_D]: "#244999",
  [LIKELY_D]: "#577CCC",
  [LEAN_D]: "#8AAFFF",
  [TILT_D]: "#949BB3",
  [SAFE_R]: "#D22532",
  [LIKELY_R]: "#FF5865",
  [LEAN_R]: "#FF8B98",
  [TILT_R]: "#CF8980",
  // [SAFE_I]: "#9932CC",
  // [LIKELY_I]: "#B86FDC",
  // [LEAN_I]: "#D6ADEB",
  // [TILT_I]: "#E8D8F2",
  [TOSSUP]: "#C9C09B",
};

export const colorFlipByParty: Record<string, string> = {
  [DEMOCRAT]: "#052fd6",
  [REPUBLICAN]: "#d60819",
};

export const nameByRating: Record<string, string> = {
  [SAFE_D]: "Safe Democrat",
  [LIKELY_D]: "Likely Democrat",
  [LEAN_D]: "Lean Democrat",
  [TILT_D]: "Tilt Democrat",
  [SAFE_R]: "Safe Republican",
  [LIKELY_R]: "Likely Republican",
  [LEAN_R]: "Lean Republican",
  [TILT_R]: "Tilt Republican",
  // [SAFE_I]: "Safe Independent",
  // [LIKELY_I]: "Likely Independent",
  // [LEAN_I]: "Lean Independent",
  // [TILT_I]: "Tilt Independent",
  [TOSSUP]: "Tossup",
};
