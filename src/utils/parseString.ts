// This function is used for the key to transform the rating string into a cleaner string
// For example: safe-d -> Safe, safe-r -> Safe, lean-d -> Lean, lean-r -> Lean
// TODO: Refactor this maybe map the rating with the party with one of the party agnostic rating strings
export function firstCharStringUppercase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function parsePartyRatingString(rating: string) {
  if (rating.includes("-r")) {
    const parsedRatingRepublican = rating.replace("-r", "");
    return firstCharStringUppercase(parsedRatingRepublican);
  }
  if (rating.includes("-d")) {
    const parsedRatingDemocrat = rating.replace("-d", "");
    return firstCharStringUppercase(parsedRatingDemocrat);
  }
}
