import { useState } from "react";
import ElectionMap from "./components/ElectionMap";
import "./App.css";

function App() {
  return (
    <>
      <section id="center">
        <div className="hero"></div>
        <div>
          {/* <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p> */}
          <ElectionMap />
        </div>
      </section>
    </>
  );
}

export default App;
