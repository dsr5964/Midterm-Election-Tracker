import { useState } from "react";
import ElectionMap from "./components/ElectionMap";

import senateData from "./data/senate.json" with { type: "json" };
import houseData from "./data/house.json" with { type: "json" };
import governorData from "./data/governors.json" with { type: "json" };

function App() {
  return (
    <>
      <title>Midterm Elections</title>
      <div className="">
        <button>Senate</button>
        <button>Governor</button>
        <button>House</button>
      </div>
      <section id="center">
        <div className="hero"></div>
        <div>
          <ElectionMap data={senateData} />
        </div>
      </section>
    </>
  );
}

export default App;
