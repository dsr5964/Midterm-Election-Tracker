import { CCard, CCardBody, CCardText, CCardTitle, CRow } from "@coreui/react";
import { ratingByParty, tossupConfig } from "../constants";
import {
  firstCharStringUppercase,
  parsePartyRatingString,
} from "../utils/parseString";

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
      <CCardBody>
        <CCardTitle
          style={{
            margin: 0,
            fontSize: "20px",
          }}
        >
          Key
        </CCardTitle>
        <CCardBody>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Object.entries(ratingByParty).map(([party, ratingsConfig]) => (
              <div style={{}}>
                {party}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignContent: "space-between",
                    width: "24rem",
                  }}
                >
                  {ratingsConfig.map((ratingConfig) => (
                    <div>
                      {parsePartyRatingString(ratingConfig.rating)}
                      <div
                        style={{
                          width: "40px",
                          aspectRatio: 1,
                          backgroundColor: ratingConfig.color,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {firstCharStringUppercase(tossupConfig.rating)}
            <div
              style={{
                width: "40px",
                aspectRatio: 1,
                backgroundColor: tossupConfig.color,
              }}
            ></div>
          </div>
        </CCardBody>
      </CCardBody>
    </CCard>
  );
}

export default Key;
