import {
  ComposableMap,
  Geographies,
  Geography,
} from "@vnedyalk0v/react19-simple-maps";
import allStateAbbrevs from "../data/stateabbrevs.json";
import geoData from "../data/states-10m.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { BackButton } from "./BackButton";
import type {
  Candidate,
  Incumbent,
  PoliticalParty,
  State,
  StateAbbr,
} from "../types/types";
import {
  NO_RACE_COLOR,
  SAFE_R,
  LIKELY_R,
  LEAN_R,
  TILT_R,
  SAFE_D,
  LIKELY_D,
  LEAN_D,
  TILT_D,
  TOSSUP,
} from "../constants";
import "../App.css";

const ratingToValueMap: Record<string, number> = {
  [SAFE_D]: 3,
  [SAFE_R]: -3,
  [LIKELY_D]: 2,
  [LIKELY_R]: -2,
  [LEAN_D]: 1,
  [LEAN_R]: -1,
  [TILT_D]: 0.5,
  [TILT_R]: -0.5,
  [TOSSUP]: 0,
};

function getState(data, stateId: string): State | undefined {
  const individualState = allStateAbbrevs.find(
    (state) => state.val === stateId,
  );

  if (individualState) {
    const stateKey = individualState.id as keyof typeof data.states;

    if (stateKey in data.states) {
      const stateName = data.states[stateKey].name;
      console.log(stateName);
      const ratings: string[] = data.states[stateKey].race.ratings;
      const rating = getRating(ratings);

      const candidates: Candidate[] = getCandidates(
        data.states[stateKey].race.candidates,
      );
      const incumbent: Incumbent = getIncumbent(
        data.states[stateKey].race.incumbent,
      );

      const isFlip = checkIsFlip(incumbent.party, rating);

      const state = {
        id: stateId,
        abbrev: individualState.id as StateAbbr,
        name: stateName,
        rating: rating,
        candidates: candidates,
        incumbent: incumbent,
        flip: isFlip,
      };
      return state;
    }
  }
}

function getCandidates(candidateData: Candidate[]): Candidate[] {
  const candidates: Candidate[] = candidateData.map((candidate: Candidate) => {
    return {
      name: candidate.name,
      party: candidate.party,
      status: candidate.status,
      isIncumbent: false, // TODO: Check if candidate is incumbent
    };
  });
  return candidates;
}

function getIncumbent(incumbentData: Incumbent): Incumbent {
  return {
    name: incumbentData.name,
    party: incumbentData.party,
    retiring: incumbentData.retiring ? true : false,
    firstElected: incumbentData.firstElected,
    note: incumbentData.note,
    vacant: !incumbentData ? true : false,
  } as Incumbent;
}

function calculateAverageRating(ratings: string[]): number {
  const ratingValue = ratings.reduce((accumulator, currentRating) => {
    const ratingValue = ratingToValueMap[currentRating];
    return accumulator + ratingValue;
  }, 0);
  return ratingValue / ratings.length;
}

function getRating(ratings: string[]): string {
  const ratingValue = calculateAverageRating(ratings);
  switch (true) {
    case ratingValue >= 2.5:
      return SAFE_D;
    case ratingValue <= -2.5:
      return SAFE_R;
    case ratingValue >= 1.5:
      return LIKELY_D;
    case ratingValue <= -1.5:
      return LIKELY_R;
    case ratingValue >= 0.75:
      return LEAN_D;
    case ratingValue <= -0.75:
      return LEAN_R;
    case ratingValue >= 0.25:
      return TILT_D;
    case ratingValue <= -0.25:
      return TILT_R;
    default:
      return TOSSUP;
  }
}

function getRatingColor(rating: string): string {
  switch (rating) {
    case SAFE_R:
      return "#D22532";

    case SAFE_D:
      return "#244999";

    case LIKELY_R:
      return "#FF5865";

    case LIKELY_D:
      return "#577CCC";

    case LEAN_R:
      return "#FF8B98";

    case LEAN_D:
      return "#8AAFFF";

    case TILT_R:
      return "#CF8980";

    case TILT_D:
      return "#949BB3";

    case TOSSUP:
      return "#C9C09B";

    default:
      return "#000000";
  }
}

function getStateColorFromIncumbent(incumbent: Incumbent): string {
  const termLimited = incumbent.note === "Term-limited"; // This is for gubernatorial races
  switch (incumbent.party) {
    case "D":
      if (incumbent.retiring || termLimited) {
        return "#0671B0";
      } else if (incumbent.vacant) {
        return "#808080";
      } else {
        return "#92C5DE";
      }

    case "R":
      if (incumbent.retiring || termLimited) {
        return "#CA0020";
      } else if (incumbent.vacant) {
        return "#808080";
      } else {
        return "#F48882";
      }
    case "I":
      if (incumbent.retiring || termLimited) {
        return "#666966";
      } else if (incumbent.vacant) {
        return "#808080";
      } else {
        return "#999699";
      }
  }
}

const initState: State = {
  id: "",
  name: "",
  rating: "",
  abbrev: undefined,
  candidates: [],
  incumbent: undefined,
  flip: false,
};
const buttonNames: string[] = ["senate", "governor", "house"];

const stripeConfigs = {
  democrat: { line: "#335cff", background: "#577CCC" },
  republican: { line: "#FF5865", background: "#D22532" },
  independent: { line: "#7F00FF", background: "#6C3BAA" },
};

export default function ElectionMap({ data, title }) {
  const navigate = useNavigate();
  const [stateData, setStateData] = useState<State>(initState);
  const [toggleIncumbents, setToggleIncumbents] = useState<boolean>(false);

  const lowerTitle = title.toLowerCase();
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {buttonNames.map((name) => {
          if (name !== lowerTitle) {
            return <button onClick={() => navigate(`/${name}`)}>{name}</button>;
          }
        })}
        <BackButton />
      </div>
      <h1>{title} Map 2026</h1>
      <button onClick={() => setToggleIncumbents(!toggleIncumbents)}>
        {toggleIncumbents ? `Midterm Election Matchups` : `Incumbents`}
      </button>
      <div style={{ width: "800px", maxWidth: "960px", margin: "0 auto" }}>
        <ComposableMap
          projection="geoAlbersUsa"
          width={800}
          height={500}
          style={{ width: "100%", height: "auto" }}
          projectionConfig={{ scale: 1000 }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <defs>
            {Object.entries(stripeConfigs).map(([partyKey, config]) => (
              <pattern
                key={partyKey}
                id={`diagonal-stripe-${partyKey}`}
                patternUnits="userSpaceOnUse"
                width="10"
                height="10"
                patternTransform="rotate(-45)"
              >
                <rect width="10" height="10" fill={config.background} />
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="10"
                  stroke={config.line}
                  strokeWidth="6"
                />
              </pattern>
            ))}
          </defs>
          <Geographies geography={geoData}>
            {({ geographies }) => {
              return geographies.map((geo) => {
                const state = getState(data, geo.id);
                if (!state) {
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: NO_RACE_COLOR,
                          outline: "none",
                          pointerEvents: "none",
                          boxShadow: "10px 10px",
                        },
                        hover: {
                          fill: NO_RACE_COLOR,
                          outline: "none",
                        },
                        pressed: {
                          fill: NO_RACE_COLOR,
                          outline: "none",
                        },
                      }}
                    ></Geography>
                  );
                }

                const stateColor: string = toggleIncumbents
                  ? getStateColorFromIncumbent(state.incumbent!)
                  : getRatingColor(state!.rating);

                const partyKey = () => {
                  if (state.rating.includes("d")) {
                    return "democrat";
                  }
                  if (state.rating.includes("r")) {
                    return "republican";
                  } else {
                    return "independent";
                  }
                };

                const patternFill = `url(#diagonal-stripe-${partyKey()})`;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={stateColor}
                    stroke="white"
                    strokeWidth={1}
                    style={{
                      default: {
                        fill:
                          state.flip && !toggleIncumbents
                            ? patternFill
                            : stateColor,
                        outline: "black",
                        cursor: "pointer",
                      },
                      hover: {
                        // fill: stateColor,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        // fill: stateColor,
                        outline: "none",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => setStateData(state)}
                  />
                );
              });
            }}
          </Geographies>
        </ComposableMap>
      </div>
      <Card stateData={stateData} toggleIncumbents={toggleIncumbents} />
    </div>
  );
}
function checkIsFlip(incumbentParty: PoliticalParty, rating: string) {
  switch (incumbentParty) {
    case "R": {
      if (rating.includes("d")) {
        return true;
      }
      break;
    }
    case "D": {
      if (rating.includes("r")) {
        return true;
      }
      break;
    }
    case "I": {
      if (rating.includes("r") || rating.includes("d")) {
        return true;
      }
      break;
    }
    default:
      return false;
  }
  console.log(`Incumbent party ${incumbentParty}`);
  console.log(`Rating ${rating}`);
  return false;
}
