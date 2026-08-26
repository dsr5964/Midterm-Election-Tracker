import { CCard, CCardBody, CCardText, CCardTitle, CRow } from "@coreui/react";
import type { ReactNode } from "react";
import type {
  Candidate,
  Incumbent,
  PoliticalParty,
  State,
} from "../types/types";

function displayCandidateData(candidateData: Candidate[]): ReactNode {
  if (!candidateData || candidateData.length === 0) {
    return <CCardText>No candidates yet</CCardText>;
  }

  //const primaryDemocrats = getPrimaryCandidatesByParty(candidateData, "D");
  //const primaryRepublicans = getPrimaryCandidatesByParty(candidateData, "R");

  // return (
  //   <>
  //     <CCardText>
  //       Democrat primary:
  //       {primaryDemocrats.map((democratCandidate, index) => (
  //         <CCardText key={index}>{democratCandidate.name}</CCardText>
  //       ))}
  //     </CCardText>
  //     <CCardText>
  //       Republican primary:
  //       {primaryRepublicans.map((republicanCandidate, index) => (
  //         <CCardText key={index}>{republicanCandidate.name}</CCardText>
  //       ))}
  //     </CCardText>
  //   </>
  // );
  return candidateData.map((candidate, index) => {
    return (
      <>
        <CCardText key={index}>
          {candidate.name} ({candidate.party})
        </CCardText>
      </>
    );
  });
}

function getPrimaryCandidatesByParty(
  candidateData: Candidate[],
  party: PoliticalParty,
) {
  const primaryCandidates: Candidate[] = [];
  candidateData.map((candidate) => {
    switch (candidate.status) {
      case "primary-tbd":
      case "primary-runoff":
        if (candidate.party === party) {
          primaryCandidates.push(candidate);
        }
    }
  });
  return primaryCandidates;
}

function displayIncumbentData(incumbentData: Incumbent): ReactNode {
  if (!incumbentData) {
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

interface CardProps {
  stateData: State;
  toggleIncumbents: boolean;
}

// TODO: Add a badge for flips
// TODO: Add a badge for the rating
function Card({ stateData, toggleIncumbents }: CardProps) {
  return (
    <CRow
      style={{
        display: "flex",
      }}
    >
      <CCard
        style={{
          width: "20rem",
          backgroundColor: "#ffffff",
          color: "black",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          padding: "8px",
        }}
      >
        <CCardBody>
          <CCardTitle
            style={{
              fontSize: "24px",
              margin: "10px 0",
            }}
          >
            {stateData.name}
          </CCardTitle>
          {toggleIncumbents
            ? displayIncumbentData(stateData.incumbent!)
            : displayCandidateData(stateData.candidates)}
        </CCardBody>
      </CCard>
    </CRow>
  );
}

export default Card;
