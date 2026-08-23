import { CCard, CCardBody, CCardText, CCardTitle, CRow } from "@coreui/react";

function Key() {
  return (
    <CCard
      style={{
        width: "16rem",
        height: "32rem",
        color: "white",
        borderRadius: "10px",
        display: "flex",
        margin: "10px",
      }}
    >
      <CCardBody style={{ padding: "10px" }}>
        <CCardTitle>Key</CCardTitle>
        <CCardBody></CCardBody>
      </CCardBody>
    </CCard>
  );
}

export default Key;
