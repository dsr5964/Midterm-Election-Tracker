import ElectionMap from "./components/ElectionMap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import senateData from "./data/senate.json" with { type: "json" };
import houseData from "./data/house.json" with { type: "json" };
import governorData from "./data/governors.json" with { type: "json" };
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <section id="center">
        <title>Midterm Elections</title>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/senate"
              element={<ElectionMap data={senateData} raceType="senate" />}
            />
            <Route
              path="/governor"
              element={<ElectionMap data={governorData} raceType="governor" />}
            />
            <Route
              path="/house"
              element={<ElectionMap data={houseData} raceType="house" />}
            />
          </Routes>
        </Router>
      </section>
    </>
  );
}

export default App;
