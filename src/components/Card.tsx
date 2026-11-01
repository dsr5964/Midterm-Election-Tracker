import { CCard, CCardBody, CCardTitle, CCardText, CRow } from "@coreui/react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
import { useState } from "react";

interface CardProps {
  stateData: State | HouseState | null;
  toggleIncumbents: boolean;
  raceType: RaceType;
}

// TODO: Add a badge for flips
// TODO: Add a badge for the rating
export default function ElectionCard({
  stateData,
  toggleIncumbents,
  raceType,
}: CardProps) {
  // const [accordionState, setAccordionState] = useState<boolean[] | null>(null);

  if (stateData === null) {
    return <span>Select a state</span>;
  }
  const incumbent: Incumbent | null =
    "incumbent" in stateData ? stateData.incumbent! : null;
  const candidates: Candidate[] | undefined =
    "candidates" in stateData ? stateData.candidates : undefined;
  return (
    <Card
      sx={{
        display: "flex",
        width: "20rem",
        backgroundColor: "#1f2028",
        border: "1px solid #2e303a",
        color: "white",
        borderRadius: "10px",
        justifyContent: "center",
        padding: "8px",
        marginTop: "10px",
      }}
    >
      <CardContent>
        <Typography sx={{ fontWeight: "bold", fontSize: 28 }}>
          {stateData.name}
        </Typography>
        <Typography>
          {raceType === "house" &&
            displayCongressionalDistrictsByState(
              stateData as HouseState,
              toggleIncumbents,
            )}
        </Typography>
        {raceType !== "house" &&
          (toggleIncumbents
            ? displayIncumbentData(incumbent)
            : displayCandidateData(candidates, incumbent || null))}
      </CardContent>
      {/* <CCard
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
      > */}
      {/* <CCardBody>
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
        </CCardBody> */}
      {/* </CCard> */}
    </Card>
  );
}
