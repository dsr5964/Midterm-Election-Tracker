import { CCardText } from "@coreui/react";
import type { ReactNode } from "react";
import { PARTY_LABELS } from "../../../constants";
import type {
  Candidate,
  Incumbent,
  PoliticalParty,
  PartyGroup,
} from "../../../types/types";
import CandidateAvatar from "./CandidateAvatar";

function groupCandidatesByParty(candidates: Candidate[]): PartyGroup[] {
  const partyMap = new Map<string, Candidate[]>();
  for (const candidate of candidates) {
    if (!partyMap.has(candidate.party)) {
      partyMap.set(candidate.party, []);
    }
    partyMap.get(candidate.party)!.push(candidate);
  }
  return Array.from(partyMap.entries()).map(([party, candidates]) => ({
    party,
    candidates,
    isPrimary: candidates.some(
      (candidate) => candidate.status === "primary-tbd",
    ),
  }));
}

export function displayCandidateData(
  candidateData: Candidate[] | undefined,
  incumbent: Incumbent | null,
): ReactNode {
  if (!candidateData || candidateData.length === 0) {
    return <CCardText>Please select a state</CCardText>;
  }

  const groups = groupCandidatesByParty(candidateData);

  return (
    <>
      {groups.map((group) => (
        <>
          <strong>
            {group.isPrimary
              ? `${PARTY_LABELS[group.party as PoliticalParty]} Primary`
              : ""}
          </strong>
          {group.candidates.map((candidate, index) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <CandidateAvatar name={candidate.name} party={candidate.party} />
              <CCardText
                className={`${PARTY_LABELS[candidate.party]}-text`}
                key={index}
              >
                {group.isPrimary
                  ? `${candidate.name}`
                  : `${candidate.name} (${candidate.party}) ${incumbent && candidate.name === incumbent.name ? "*" : ""}`}
              </CCardText>
            </div>
          ))}
        </>
      ))}
    </>
  );
}

export function displayIncumbentData(
  incumbentData: Incumbent | null,
): ReactNode {
  if (incumbentData === null) {
    return <CCardText>Vacant seat - no incumbent</CCardText>;
  }
  return (
    <>
      <CCardText>Incumbent: {incumbentData.name}</CCardText>
      <CCardText>Political Party: {incumbentData.party}</CCardText>
      <CCardText>First elected: {incumbentData.firstElected}</CCardText>
    </>
  );
}
