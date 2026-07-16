import { CCard, CCardBody, CCardText, CCardTitle, CRow } from "@coreui/react";
import type { ReactNode } from "react";

function displayCandidateData(candidateData): ReactNode {
  console.log(candidateData);
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
      <CCardText>Political Party: {incumbentData.politicalParty}</CCardText>
      <CCardText>First elected: {incumbentData.firstElected}</CCardText>
      {/* {incumbentData.note ? <CCardText>{incumbentData.note}</CCardText> : ""} */}
    </>
  );
}

function Card({ stateData, toggleRatings }) {
  const colors = [{ color: "light" }];
  return (
    <CRow>
      {colors.map((item, index) => (
        <CCard
          key={index}
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
            {toggleRatings
              ? displayCandidateData(stateData.candidates)
              : displayIncumbentData(stateData.incumbent)}
          </CCardBody>
        </CCard>
      ))}
    </CRow>
  );
}

export default Card;
