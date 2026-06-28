import { useState } from "react";
import ElectionMap from "./components/ElectionMap";
import "./App.css";

function App() {
  return (
    <>
      <section id="center">
        <div className="hero"></div>
        <div>
          <ElectionMap />
        </div>
      </section>
    </>
  );
}

export default App;
