import { CCard, CCardBody, CCardText, CCardTitle, CRow } from "@coreui/react";
import type { ReactNode } from "react";
import type { Candidate, Incumbent, State } from "../types/types";

function displayCandidateData(candidateData: Candidate[]): ReactNode {
  if (!candidateData || candidateData.length === 0) {
    return <CCardText>No candidates yet</CCardText>;
  }

  return candidateData.map((candidate, index) => {
    switch (candidate.status) {
      case "incumbent":
      case "nominee":
        return (
          <>
            <CCardText key={index}>
              {candidate.name} ({candidate.party})
            </CCardText>
          </>
        );
      case "primary-runoff":
      case "primary-tbd": {
        return (
          <>
            <CCardText key={index}>
              {candidate.name} ({candidate.party})
            </CCardText>
          </>
        );
      }
    }
  });
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
