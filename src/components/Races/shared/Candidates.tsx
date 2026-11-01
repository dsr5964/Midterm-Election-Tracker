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
import { Typography } from "@mui/material";

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
    return <Typography>Please select a state</Typography>;
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
                  padding: "20px",
                }}
              >
                <CandidateAvatar
                  name={candidate.name}
                  party={candidate.party}
                />
                <Typography
                  className={`${PARTY_LABELS[candidate.party]}-text`}
                  key={index}
                  sx={{
                    fontWeight: "bold",
                    paddingTop: "10px",
                  }}
                >
                  {group.isPrimary
                    ? `${candidateName}`
                    : `${candidateName} (${candidate.party}) ${incumbent && candidate.name === incumbent.name ? "*" : ""}`}
                </Typography>
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
    return <Typography>Vacant seat - no incumbent</Typography>;
  }
  const incumbentName = incumbentData.name.includes(" (")
    ? cleanName(incumbentData.name)
    : incumbentData.name;
  return (
    <>
      <CandidateAvatar name={incumbentData.name} party={incumbentData.party} />
      <Typography>
        <strong>Incumbent: </strong>
        {incumbentName}
      </Typography>
      <Typography>
        <strong>Party: </strong>
        {incumbentData.party}
      </Typography>
      <Typography>
        <strong>First elected: </strong>
        {incumbentData.firstElected}
      </Typography>
    </>
  );
}
