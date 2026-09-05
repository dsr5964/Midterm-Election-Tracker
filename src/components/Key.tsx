import { CCard, CCardBody, CCardText, CCardTitle, CRow } from "@coreui/react";
import { colorByRating, colorFlipByParty, nameByRating } from "../constants";

function Key() {
  return (
    <CCard
      style={{
        width: "20rem",
        height: "24rem",
        color: "white",
        borderRadius: "10px",
        display: "flex",
        flexShrink: 1,
        margin: "10px",
        justifyContent: "center",
        border: "1px solid white",
      }}
    >
      <CCardBody style={{ padding: "10px" }}>
        <CCardTitle
          style={{
            margin: 0,
            fontSize: "20px",
          }}
        >
          Key
        </CCardTitle>
        <CCardBody>
          <div>
            {Object.entries(colorByRating).map(([rating, color]) => (
              <CCardText>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "10px",
                  }}
                >
                  <p>{nameByRating[rating]}</p>
                  <div
                    style={{
                      width: "20px",
                      aspectRatio: 1,
                      backgroundColor: color,
                    }}
                  ></div>
                </div>
              </CCardText>
            ))}
            {Object.entries(colorFlipByParty).map(([party, flipColor]) => (
              <CCardText>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "10px",
                  }}
                >
                  <p>Flip to {party}s</p>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      background: `linear-gradient(45deg, ${flipColor} 25%, white 25%, ${flipColor} 50%, white 25%, ${flipColor} 75%, white 75%, ${flipColor} 100%)`,
                    }}
                  ></div>
                </div>
              </CCardText>
            ))}
          </div>
        </CCardBody>
      </CCardBody>
    </CCard>
  );
}

export default Key;
