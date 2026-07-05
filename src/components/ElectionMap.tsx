import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "@vnedyalk0v/react19-simple-maps";
import allStateAbbrevs from "../data/stateabbrevs.json";
import geoData from "../data/states-10m.json";
import { useState } from "react";

const markers = [
  { markerOffset: -20, name: "Chicago", coordinates: [-87.6298, 41.8781] },
  { markerOffset: -20, name: "Boston", coordinates: [-71.0589, 42.3601] },
  { markerOffset: -20, name: "Tulsa", coordinates: [-95.9928, 36.154] },
  { markerOffset: -20, name: "Baltimore", coordinates: [-76.6122, 39.2904] },
  { markerOffset: -20, name: "Miami", coordinates: [-80.1918, 25.7617] },
  {
    markerOffset: 30,
    name: "Washington, D.C.",
    coordinates: [-77.0369, 38.9072],
  },
  { markerOffset: -20, name: "Los Angeles", coordinates: [-118.2426, 34.0549] },
];

type StateAbbr =
  | "AL"
  | "AK"
  | "AZ"
  | "AR"
  | "CA"
  | "CO"
  | "CT"
  | "DE"
  | "FL"
  | "GA"
  | "HI"
  | "ID"
  | "IL"
  | "IN"
  | "IA"
  | "KS"
  | "KY"
  | "LA"
  | "ME"
  | "MD"
  | "MA"
  | "MI"
  | "MN"
  | "MS"
  | "MO"
  | "MT"
  | "NE"
  | "NV"
  | "NH"
  | "NJ"
  | "NM"
  | "NY"
  | "NC"
  | "ND"
  | "OH"
  | "OK"
  | "OR"
  | "PA"
  | "RI"
  | "SC"
  | "SD"
  | "TN"
  | "TX"
  | "UT"
  | "VT"
  | "VA"
  | "WA"
  | "WV"
  | "WI"
  | "WY";

type State = {
  id: string;
  abbrev: StateAbbr;
  name: string;
  rating: string;
};

const NO_RACE_COLOR = "#E5E5E0";

// const partyColor = {
//   dem: {
//     "safe-d": "#244999",
//     "likely-d": "#577CCC",
//     "lean-d": "#8AAFFF",
//     "tilt-d": "#949BB3",
//   },
//   rep: {
//     "safe-r": "#D22532",
//     "likely-r": "#FF5865",
//     "lean-r": "#FF8B98",
//     "tilt-r": "#CF8980",
//   },
//   tossup: "C9C09B",
// };

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
      const state = {
        id: stateId,
        abbrev: individualState.id as StateAbbr,
        name: stateName,
        rating: rating,
      };
      return state;
    }
  }
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

export default function ElectionMap({ data, title }) {
  return (
    <div>
      <h1>{title} Map 2026</h1>
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

                const stateColor: string = getRatingColor(state!.rating);

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
                  />
                );
              });
            }}
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
}
