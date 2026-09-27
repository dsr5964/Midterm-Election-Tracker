import {
  SAFE_R,
  colorByRating,
  SAFE_D,
  LIKELY_R,
  LIKELY_D,
  LEAN_R,
  LEAN_D,
  TILT_R,
  TILT_D,
  TOSSUP,
  SAFE_I,
  LIKELY_I,
  LEAN_I,
  TILT_I,
} from "../constants";

export function getRatingColor(rating: string): string {
  switch (rating) {
    case SAFE_R:
      return colorByRating[SAFE_R];
    case SAFE_D:
      return colorByRating[SAFE_D];
    case LIKELY_R:
      return colorByRating[LIKELY_R];
    case LIKELY_D:
      return colorByRating[LIKELY_D];
    case LEAN_R:
      return colorByRating[LEAN_R];
    case LEAN_D:
      return colorByRating[LEAN_D];
    case TILT_R:
      return colorByRating[TILT_R];
    case TILT_D:
      return colorByRating[TILT_D];
    case TOSSUP:
      return colorByRating[TOSSUP];
    case SAFE_I:
      return colorByRating[SAFE_I];
    case LIKELY_I:
      return colorByRating[LIKELY_I];
    case LEAN_I:
      return colorByRating[LEAN_I];
    case TILT_I:
      return colorByRating[TILT_I];
    default:
      return "#000000";
  }
}
