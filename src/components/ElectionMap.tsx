import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "@vnedyalk0v/react19-simple-maps";
import allStateAbbrevs from "../data/stateabbrevs.json";
import geoData from "../data/states-10m.json";

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
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: "#D6D6DA", outline: "none" },
                  hover: { fill: "#F53", outline: "none" },
                  pressed: { fill: "#E42", outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
