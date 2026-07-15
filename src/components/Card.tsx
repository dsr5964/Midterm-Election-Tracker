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
            {stateData.candidates.map((candidate) => {
              const isIncumbent: boolean =
                stateData.incumbent.name === candidate.name ? true : false;
              return (
                <>
                  <CCardText
                    style={{ fontWeight: isIncumbent ? "bold" : "normal" }}
                  >
                    {candidate.name} ({candidate.politicalParty}){" "}
                    {isIncumbent ? "Incumbent" : ""}
                  </CCardText>
                </>
              );
            })}
          </CCardBody>
        </CCard>
      ))}
    </CRow>
  );
}

export default Card;
