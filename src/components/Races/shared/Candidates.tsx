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
import { cleanName } from "../../../utils/parseString";

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
          {group.candidates.map((candidate, index) => {
            const candidateName = candidate.name.includes(" (")
              ? cleanName(candidate.name)
              : candidate.name;
            // for now do this for some politicians and use the name from the json directly for fetching the img
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <CandidateAvatar
                  name={candidate.name}
                  party={candidate.party}
                />
                <CCardText
                  className={`${PARTY_LABELS[candidate.party]}-text`}
                  key={index}
                >
                  {group.isPrimary
                    ? `${candidateName}`
                    : `${candidateName} (${candidate.party}) ${incumbent && candidate.name === incumbent.name ? "*" : ""}`}
                </CCardText>
              </div>
            );
          })}
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
  const incumbentName = incumbentData.name.includes(" (")
    ? cleanName(incumbentData.name)
    : incumbentData.name;
  return (
    <>
      <CandidateAvatar name={incumbentData.name} party={incumbentData.party} />
      <CCardText>
        <strong>Incumbent: </strong>
        {incumbentName}
      </CCardText>
      <CCardText>
        <strong>Party: </strong>
        {incumbentData.party}
      </CCardText>
      <CCardText>
        <strong>First elected: </strong>
        {incumbentData.firstElected}
      </CCardText>
    </>
  );
}
