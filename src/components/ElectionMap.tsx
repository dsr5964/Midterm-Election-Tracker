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
import type { Candidate, Incumbent, State, StateAbbr } from "../types/types";

const NO_RACE_COLOR = "#E5E5E0";

const ratingToValueMap: Record<string, number> = {
  "safe-d": 3,
  "safe-r": -3,
  "likely-d": 2,
  "likely-r": -2,
  "lean-d": 1,
  "lean-r": -1,
  "tilt-d": 0.5,
  "tilt-r": -0.5,
  tossup: 0,
};

function getState(data, stateId: string): State | undefined {
  const individualState = allStateAbbrevs.find(
    (state) => state.val === stateId,
  );

  if (individualState) {
    const stateKey = individualState.id as keyof typeof data.states;

    if (stateKey in data.states) {
      const stateName = data.states[stateKey].name;
      const ratings: string[] = data.states[stateKey].race.ratings;
      const rating = getRating(ratings);

      const candidates: Candidate[] = getCandidates(
        data.states[stateKey].race.candidates,
      );
      const incumbent: Incumbent = getIncumbent(
        data.states[stateKey].race.incumbent,
      );

      const state = {
        id: stateId,
        abbrev: individualState.id as StateAbbr,
        name: stateName,
        rating: rating,
        candidates: candidates,
        incumbent: incumbent,
      };
      return state;
    }
  }
}

function getCandidates(candidateData): Candidate[] {
  const candidates: Candidate[] = candidateData.map((candidate) => {
    return {
      name: candidate.name,
      politicalParty: candidate.party,
      status: candidate.status,
      isIncumbent: false,
    };
  });
  return candidates;
}

function getIncumbent(incumbentData): Incumbent {
  return {
    name: incumbentData.name,
    politicalParty: incumbentData.party,
    retiring: incumbentData.retiring ? true : false,
    firstElected: incumbentData.firstElected,
    note: incumbentData.note,
    vacant: incumbentData.vacant ? true : false,
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
      return "safe-d";
    case ratingValue <= -2.5:
      return "safe-r";
    case ratingValue >= 1.5:
      return "likely-d";
    case ratingValue <= -1.5:
      return "likely-r";
    case ratingValue >= 0.75:
      return "lean-d";
    case ratingValue <= -0.75:
      return "lean-r";
    case ratingValue >= 0.25:
      return "tilt-d";
    case ratingValue <= -0.25:
      return "tilt-r";
    default:
      return "tossup";
  }
}

function getRatingColor(rating: string): string {
  switch (rating) {
    case "safe-r":
      return "#D22532";

    case "safe-d":
      return "#244999";

    case "likely-r":
      return "#FF5865";

    case "likely-d":
      return "#577CCC";

    case "lean-r":
      return "#FF8B98";

    case "lean-d":
      return "#8AAFFF";

    case "tilt-r":
      return "#CF8980";

    case "tilt-d":
      return "#949BB3";

    case "tossup":
      return "#C9C09B";

    default:
      return "#000000";
  }
}

function getStateColorFromIncumbent(incumbent: Incumbent): string {
  const termLimited = incumbent.note === "Term-limited";
  switch (incumbent.politicalParty) {
    case "D":
      if (incumbent.retiring || termLimited) {
        return "#0671B0";
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
};
const buttonNames: string[] = ["senate", "governor", "house"];

export default function ElectionMap({ data, title }) {
  const navigate = useNavigate();
  const [stateData, setStateData] = useState<State>(initState);
  const [toggleRatings, setToggleRatings] = useState<boolean>(false);

  const lowerTitle = title.toLowerCase();
  return (
    <div>
      <button onClick={() => navigate("/")}>Back</button>
      {buttonNames.map((name) => {
        if (name !== lowerTitle) {
          return <button onClick={() => navigate(`/${name}`)}>{name}</button>;
        }
      })}
      <h1>{title} Map 2026</h1>
      <button onClick={() => setToggleRatings(!toggleRatings)}>
        {toggleRatings ? `Map of Incumbents` : `Consensus Ratings`}
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

                const stateColor: string = toggleRatings
                  ? getRatingColor(state!.rating)
                  : getStateColorFromIncumbent(state.incumbent);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={stateColor}
                    stroke="white"
                    strokeWidth={1}
                    style={{
                      default: {
                        fill: stateColor,
                        outline: "black",
                        cursor: "pointer",
                      },
                      hover: {
                        fill: stateColor,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: stateColor,
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
      <Card stateData={stateData} />
    </div>
  );
}
