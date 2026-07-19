import { CCard, CCardBody, CCardText, CCardTitle, CRow } from "@coreui/react";
import type { ReactNode } from "react";

function displayCandidateData(candidateData): ReactNode {
  return candidateData.map((candidate) => (
    <>
      <CCardText>
        {candidate.name} ({candidate.politicalParty})
      </CCardText>
    </>
  ));
}

function displayIncumbentData(incumbentData): ReactNode {
  return (
    <>
      <CCardText>Incumbent: {incumbentData.name}</CCardText>
      <CCardText>Political Party: {incumbentData.party}</CCardText>
      <CCardText>First elected: {incumbentData.firstElected}</CCardText>
    </>
  );
}

// TODO: Add interface for component props
function Card({ stateData, toggleIncumbents }) {
  console.log(JSON.stringify(stateData));
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
            ? displayIncumbentData(stateData.incumbent)
            : displayCandidateData(stateData.candidates)}
        </CCardBody>
      </CCard>
    </CRow>
  );
}

export default Card;
