import {
  ComposableMap,
  Geographies,
  Geography,
} from "@vnedyalk0v/react19-simple-maps";
import geoData from "../data/states-10m.json";

export default function BlankMap() {
  return (
    <ComposableMap
      projection="geoAlbersUsa"
      projectionConfig={{ scale: 1000 }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <Geographies geography={geoData}>
        {({ geographies }) => {
          return geographies.map((geo) => (
            <Geography fill={"white"} key={geo.rsmKey} geography={geo} />
          ));
        }}
      </Geographies>
    </ComposableMap>
  );
}
