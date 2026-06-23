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

function getState(stateId: string): State | undefined {
  const stateObj = allStateAbbrevs.find((state) => state.val === stateId);
  if (stateObj) {
    const stateKey = stateObj.id as keyof typeof senateData.states;

    if (stateKey in senateData.states) {
      const state = {
        id: stateId,
        abbrev: stateObj.id,
        name: senateData.states[stateKey].name,
        rating: senateData.states[stateKey].senate.rating,
      };
      return state;
    }
  }
}
function getRatingColor(rating: string): string {
  switch (rating) {
    case "safe-r":
      return "FF0000";
    case "safe-d":
      return "0000FF";

    default:
      return "D2B48C";
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
          {({ geographies }) => {
            geographies.map((geo) => (
              // const state = getState(geo.id);
              // console.log(state);
              // // const stateColor = getRatingColor(state!.rating);
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => console.log(getState(geo.id))}
                style={{
                  default: { fill: "#D6D6DA", outline: "none" },
                  hover: { fill: "#F53", outline: "none" },
                  pressed: {
                    fill: "#E42",
                    outline: "none",
                  },
                }}
              />
            ));
          }}
        </Geographies>
      </ComposableMap>
    </div>
  );
}
