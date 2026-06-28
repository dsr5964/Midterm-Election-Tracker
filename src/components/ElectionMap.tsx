import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "@vnedyalk0v/react19-simple-maps";
import allStateAbbrevs from "../data/stateabbrevs.json";
import geoData from "../data/states-10m.json";

import senateData from "../data/senate.json" with { type: "json" };
import houseData from "../data/house.json" with { type: "json" };
import governorData from "../data/governors.json" with { type: "json" };

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
  abbrev: string;
  name: string;
  rating: string;
};

const partyColor = {
  dem: {
    "safe-d": "",
    "likely-d": "",
    "lean-d": "",
    "tilt-d": "",
  },
  rep: {
    "safe-r": "",
    "likely-r": "",
    "lean-r": "",
    "tilt-r": "",
  },
  tossup: "C9C09B",
};

function getState(stateId: string): State | undefined {
  const stateObj = allStateAbbrevs.find((state) => state.val === stateId);
  if (stateObj) {
    const stateKey = stateObj.id as keyof typeof senateData.states;

    if (stateKey in senateData.states) {
      console.log(`State abbreviation: ${stateObj.id}`);
      const state = {
        id: stateId,
        abbrev: stateObj.id,
        name: senateData.states[stateKey].name,
        rating: senateData.states[stateKey].senate.rating,
      };
      // console.log(`Rating: ${state.rating}`);
      return state;
    }
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

export default function ElectionMap() {
  return (
    <div style={{ width: "800px", maxWidth: "960px", margin: "0 auto" }}>
      <ComposableMap
        projection="geoAlbersUsa"
        width={800}
        height={500}
        style={{ width: "100%", height: "auto" }}
        projectionConfig={{ scale: 1000 }}
      >
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              let stateColor;
              const state = getState(geo.id);
              if (state) {
                stateColor = getRatingColor(state!.rating);
              }
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: stateColor, outline: "none" },
                    hover: { fill: "#F53", outline: "none" },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
