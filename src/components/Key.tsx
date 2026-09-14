import { CCard, CCardBody, CCardText, CCardTitle, CRow } from "@coreui/react";
import { ratingByParty, tossupConfig } from "../constants";
import {
  firstCharStringUppercase,
  parsePartyRatingString,
} from "../utils/parseString";
import "../App.css";

type KeyProps = {
  toggleIncumbents: boolean;
  mapTitle: string;
};

function renderMatchupKey() {
  return (
    <>
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
    </>
  );
}

function renderIncumbentKey(mapTitle: string) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "18rem",
      }}
    >
      <div>Democratic Incumbent</div>
      <div
        style={{
          width: "40px",
          aspectRatio: 1,
          backgroundColor: "#92c5de",
        }}
      ></div>
      Democratic incumbent retiring
      <div
        style={{
          width: "40px",
          aspectRatio: 1,
          backgroundColor: "rgb(6, 113, 176)",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Republican Incumbent
        <div
          style={{
            width: "40px",
            aspectRatio: 1,
            backgroundColor: "rgb(244, 136, 130)",
          }}
        ></div>
        Republican Incumbent retiring{" "}
        {mapTitle === "Governor" ? "or lost renomination" : ""}
        <div
          style={{
            width: "40px",
            aspectRatio: 1,
            backgroundColor: "rgb(202, 0, 32)",
          }}
        ></div>
      </div>
    </div>
  );
}

function Key({ toggleIncumbents, mapTitle }: KeyProps) {
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
            {toggleIncumbents
              ? renderIncumbentKey(mapTitle)
              : renderMatchupKey()}
          </div>
        </CCardBody>
      </CCardBody>
    </CCard>
  );
}

export default Key;
