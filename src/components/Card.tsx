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
import HouseDistricts from "./Races/HouseElections";
import {
  displayIncumbentData,
  displayCandidateData,
} from "./Races/shared/Candidates";

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
        width: "100%",
        maxWidth: "36rem",
        backgroundColor: "#1f2028",
        border: "1px solid #2e303a",
        color: "white",
        borderRadius: "10px",
        justifyContent: "center",
      }}
    >
      <CardContent>
        <Typography sx={{ fontWeight: "bold", fontSize: 28 }}>
          {stateData.name}
          {"mustWatch" in stateData && stateData.mustWatch ? " ⭐️" : ""}
        </Typography>
        {/* <Typography
          sx={{ fontWeight: "bold", fontStyle: "italic", fontSize: "1rem" }}
        >
          * means the candidate is the incumbent
        </Typography> */}
        <Typography>
          {raceType === "house" && (
            <HouseDistricts
              data={stateData as HouseState}
              toggleIncumbents={toggleIncumbents}
            />
          )}
        </Typography>
        {raceType !== "house" &&
          (toggleIncumbents
            ? displayIncumbentData(incumbent)
            : displayCandidateData(candidates, incumbent || null))}
      </CardContent>
    </Card>
  );
}
