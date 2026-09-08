import { CCard, CCardBody, CCardText, CCardTitle, CRow } from "@coreui/react";
import { ratingByParty, tossupConfig } from "../constants";
import {
  firstCharStringUppercase,
  parsePartyRatingString,
} from "../utils/parseString";
import "../App.css";

function Key() {
  return (
    <CCard
      style={{
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
              <div>
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
            <div>
              Pickups
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "200px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Democrat
                  <div className="democrat-striped-square"></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Republican
                  <div className="republican-striped-square"></div>
                </div>
              </div>
            </div>
          </div>
        </CCardBody>
      </CCardBody>
    </CCard>
  );
}

export default Key;
