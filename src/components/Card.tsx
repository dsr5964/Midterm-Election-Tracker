import { CCard, CCardBody, CCardText, CCardTitle, CRow } from "@coreui/react";
import type { ReactNode } from "react";
import type { Candidate, Incumbent, State } from "../types/types";

function displayCandidateData(candidateData: Candidate[]): ReactNode {
  if (!candidateData || candidateData.length === 0) {
    return <CCardText>No candidates yet</CCardText>;
  }
  return candidateData.map((candidate, index) => (
    <>
      <CCardText key={index}>
        {candidate.name} ({candidate.party})
      </CCardText>
    </>
  ));
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

function Card({ stateData, toggleIncumbents }: CardProps) {
  return (
    <CRow>
      <CCard
        style={{
          width: "48rem",
          backgroundColor: "#ffffff",
          color: "black",
          borderRadius: "10px",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <CCardBody>
          <CCardTitle>{stateData.name}</CCardTitle>
          {toggleIncumbents
            ? displayIncumbentData(stateData.incumbent!)
            : displayCandidateData(stateData.candidates)}
        </CCardBody>
      </CCard>
    </CRow>
  );
}

export default Card;
