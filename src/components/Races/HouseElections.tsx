import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
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
      <Box sx={{ width: "100%", maxHeight: 420, overflowY: "auto", mt: 1 }}>
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
              disableGutters
              square
              sx={{
                width: "100%",
                backgroundColor: "#262833",
                color: "white",
                border: "1px solid #2e303a",
                "&:not(:last-child)": { borderBottom: 0 },
                "&::before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    pr: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "22px",
                      color: "white",
                    }}
                  >
                    {district}
                    {districtData.mustWatch ? " ⭐️" : ""}
                  </Typography>
                  {!toggleIncumbents && (
                    <Stack>
                      <Typography>{districtData.rating}</Typography>
                      <div
                        className={stripeClass}
                        style={{
                          width: "32px",
                          aspectRatio: 1,
                          borderRadius: "4px",
                          backgroundColor: ratingColor,
                          flexShrink: 0,
                        }}
                      />
                    </Stack>
                  )}
                </Box>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  backgroundColor: "#1a1b22",
                  borderTop: "1px solid #2e303a",
                }}
              >
                {toggleIncumbents
                  ? displayIncumbentData(districtData.incumbent)
                  : displayCandidateData(
                      districtData.candidates,
                      districtData.incumbent,
                    )}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </>
  );
}
