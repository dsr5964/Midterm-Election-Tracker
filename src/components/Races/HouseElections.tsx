import { CCardText } from "@coreui/react";
import type { HouseState } from "../../types/types";
import { getRatingColor } from "../../utils/stateUtils";
import {
  displayIncumbentData,
  displayCandidateData,
} from "./shared/Candidates";

export function displayCongressionalDistrictsByState(
  houseData: HouseState,
  toggleIncumbents: boolean,
) {
  if (houseData.districts.length === 0) {
    return <CCardText>Please select a state</CCardText>;
  }
  const congressionalDistricts: string[] = houseData.districts.flatMap(
    (district) => {
      return Object.keys(district);
    },
  );

  const numDemocratMembers =
    houseData.statePartyControl.democrat !== 0
      ? `Democrats: ${houseData.statePartyControl.democrat}`
      : "";
  const numRepublicanMembers =
    houseData.statePartyControl.republican !== 0
      ? `Republicans: ${houseData.statePartyControl.republican}`
      : "";
  const numIndependentMembers =
    houseData.statePartyControl.independent !== 0
      ? `Independents: ${houseData.statePartyControl.independent}`
      : "";
  return (
    <>
      <span className="Democrat-text">{numDemocratMembers}</span>{" "}
      <span className="Republican-text">{numRepublicanMembers}</span>{" "}
      <span className="Independent-text">{numIndependentMembers}</span>
      {congressionalDistricts.map((district) => {
        const districtData = houseData.districts.find(
          (d) => Object.keys(d)[0] === district,
        )?.[district];
        if (districtData) {
          const ratingColor = getRatingColor(districtData.rating);
          const incumbentParty = districtData.incumbent
            ? districtData.incumbent.party
            : "";

          const republicanFlip =
            districtData.flip &&
            (incumbentParty === "D" || incumbentParty === "I")
              ? `${districtData.rating}-striped-square`
              : "";

          const democratFlip =
            districtData.flip &&
            (incumbentParty === "R" || incumbentParty === "I")
              ? `${districtData.rating}-striped-square`
              : "";

          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                margin: "20px",
              }}
            >
              <div style={{ display: "flex", gap: "20px" }}>
                <strong>{district}</strong>
                {toggleIncumbents ? (
                  <></>
                ) : (
                  <div
                    className={`${democratFlip} ${republicanFlip}`}
                    style={{
                      width: "30px",
                      aspectRatio: 1,
                      backgroundColor: ratingColor,
                    }}
                  ></div>
                )}
              </div>

              <div>
                {toggleIncumbents
                  ? displayIncumbentData(districtData.incumbent)
                  : displayCandidateData(
                      districtData.candidates,
                      districtData.incumbent,
                    )}
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
