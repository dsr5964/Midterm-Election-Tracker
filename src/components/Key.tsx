import { CCard, CCardBody, CCardTitle } from "@coreui/react";
import { ratingByParty, tossupConfig } from "../constants";
import {
  firstCharStringUppercase,
  parsePartyRatingString,
} from "../utils/parseString";
import "../App.css";

type KeyProps = {
  toggleIncumbents: boolean;
  electionType: string;
};

function renderHouseStateLevelKey() {
  return (
    <div>
      <strong>State party majority</strong>
      <div
        style={{
          display: "flex",
          gap: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <span>Democratic</span>
          <div
            style={{
              width: "40px",
              aspectRatio: 1,
              backgroundColor: "rgb(0, 68, 201)",
            }}
          ></div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>Republican</span>
          <div
            style={{
              width: "40px",
              aspectRatio: 1,
              backgroundColor: "rgb(232, 27, 35)",
            }}
          ></div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <span>Even</span>
          <div
            style={{
              width: "40px",
              aspectRatio: 1,
              backgroundColor: "rgb(153, 50, 204)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

function renderMatchupKey(electionType: string) {
  return (
    <>
      {electionType === "House" ? <strong>District Ratings</strong> : ""}
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

function renderIncumbentKey(electionType: string) {
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
        {electionType === "Governor" ? "or lost renomination" : ""}
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

function Key({ toggleIncumbents, electionType }: KeyProps) {
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
            {electionType === "House" ? renderHouseStateLevelKey() : <></>}
            {toggleIncumbents
              ? renderIncumbentKey(electionType)
              : renderMatchupKey(electionType)}
          </div>
        </CCardBody>
      </CCardBody>
    </CCard>
  );
}

export default Key;
