import { CCard, CCardBody, CCardTitle, CRow } from "@coreui/react";
import {
  type Candidate,
  type HouseState,
  type Incumbent,
  type RaceType,
  type State,
} from "../types/types";
import { displayCongressionalDistrictsByState } from "./Races/HouseElections";
import {
  displayIncumbentData,
  displayCandidateData,
} from "./Races/shared/Candidates";

interface CardProps {
  stateData: State | HouseState;
  toggleIncumbents: boolean;
  raceType: RaceType;
}

// TODO: Add a badge for flips
// TODO: Add a badge for the rating
function Card({ stateData, toggleIncumbents, raceType }: CardProps) {
  const incumbent: Incumbent | null =
    "incumbent" in stateData ? stateData.incumbent! : null;
  const candidates: Candidate[] | undefined =
    "candidates" in stateData ? stateData.candidates : undefined;
  return (
    <CRow
      style={{
        display: "flex",
      }}
    >
      <CCard
        style={{
          width: "20rem",
          backgroundColor: "#ffffff",
          color: "black",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          padding: "8px",
          marginTop: "10px",
        }}
      >
        <CCardBody>
          <CCardTitle
            style={{
              fontSize: "24px",
              margin: "10px 0",
            }}
          >
            {stateData.name}
          </CCardTitle>
          {raceType === "house" &&
            displayCongressionalDistrictsByState(
              stateData as HouseState,
              toggleIncumbents,
            )}
          {raceType !== "house" &&
            (toggleIncumbents
              ? displayIncumbentData(incumbent)
              : displayCandidateData(candidates, incumbent || null))}
        </CCardBody>
      </CCard>
    </CRow>
  );
}

export default Card;
