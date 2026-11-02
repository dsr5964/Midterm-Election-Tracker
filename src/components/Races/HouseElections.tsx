import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import type { HouseState } from "../../types/types";
import { getRatingColor } from "../../utils/stateUtils";
import {
  displayIncumbentData,
  displayCandidateData,
} from "./shared/Candidates";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type HouseDistrictsProps = {
  data: HouseState;
  toggleIncumbents: boolean;
};

export default function HouseDistricts({
  data,
  toggleIncumbents,
}: HouseDistrictsProps) {
  if (data.districts.length === 0) {
    return <span>Please select a state</span>;
  }

  const numDemocratMembers =
    data.statePartyControl.democrat !== 0
      ? `Democrats: ${data.statePartyControl.democrat}`
      : null;
  const numRepublicanMembers =
    data.statePartyControl.republican !== 0
      ? `Republicans: ${data.statePartyControl.republican}`
      : null;
  const numIndependentMembers =
    data.statePartyControl.independent !== 0
      ? `Independents: ${data.statePartyControl.independent}`
      : null;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          p: 1,
          width: "100%",
        }}
      >
        {numDemocratMembers !== null && (
          <Typography
            sx={{ fontWeight: "bold", paddingRight: "10px" }}
            className="Democrat-text"
          >
            {numDemocratMembers}
          </Typography>
        )}
        {numRepublicanMembers !== null && (
          <Typography
            sx={{ fontWeight: "bold", paddingRight: "10px" }}
            className="Republican-text"
          >
            {numRepublicanMembers}
          </Typography>
        )}{" "}
        {numIndependentMembers !== null && (
          <Typography sx={{ fontWeight: "bold" }} className="Independent-text">
            {numIndependentMembers}
          </Typography>
        )}
      </Box>
      {data.districts.map((districtObj) => {
        const [district, districtData] = Object.entries(districtObj)[0];
        if (!districtData) return null;

        const ratingColor = getRatingColor(districtData.rating);
        const stripeClass =
          districtData.flip && districtData.incumbent
            ? `${districtData.rating}-striped-square`
            : "";
        return (
          <Accordion
            key={district}
            sx={{
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  width: "100%",
                  maxHeight: 420,
                  overflowY: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "28px",
                    color: "black",
                  }}
                >
                  {district}
                  {districtData.mustWatch ? " ⭐️" : ""}
                </Typography>
                {!toggleIncumbents ? (
                  <div
                    className={stripeClass}
                    style={{
                      width: "40px",
                      aspectRatio: 1,
                      backgroundColor: ratingColor,
                      flexShrink: 0,
                    }}
                  ></div>
                ) : (
                  <></>
                )}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {toggleIncumbents
                  ? displayIncumbentData(districtData.incumbent)
                  : displayCandidateData(
                      districtData.candidates,
                      districtData.incumbent,
                    )}
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
}
