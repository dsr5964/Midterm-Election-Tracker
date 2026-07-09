import { CCard, CCardBody, CCardText, CCardTitle, CRow } from "@coreui/react";

function Card({ stateData }) {
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
            {stateData.candidates.map((candidate) => (
              <CCardText>
                {candidate.name} ({candidate.politicalParty})
              </CCardText>
            ))}
          </CCardBody>
        </CCard>
      ))}
    </CRow>
  );
}

export default Card;
