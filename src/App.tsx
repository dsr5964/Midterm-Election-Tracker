import ElectionMap from "./components/ElectionMap";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import senateData from "./data/senate.json" with { type: "json" };
import houseData from "./data/house.json" with { type: "json" };
import governorData from "./data/governors.json" with { type: "json" };
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";

function App() {
  const date = new Date();
  return (
    <>
      <section id="center">
        <title>Midterm Elections</title>

        <BrowserRouter basename="/Midterm-Election-Tracker">
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
        </BrowserRouter>
      </section>
      <Footer date={date.toISOString().split("T")[0]} />
    </>
  );
}

export default App;
