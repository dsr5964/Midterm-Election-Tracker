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
import { useState } from "react";
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
  const congressionalDistricts: string[] = data.districts.flatMap(
    (district) => {
      return Object.keys(district);
    },
  );

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
      {congressionalDistricts.map((district) => {
        const districtData = data.districts.find(
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
                <Accordion>
                  <AccordionSummary
                    sx={{ width: "100%" }}
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "28px",
                      }}
                    >
                      {district}
                    </Typography>
                    {toggleIncumbents ? (
                      <></>
                    ) : (
                      <div
                        className={`${democratFlip} ${republicanFlip}`}
                        style={{
                          width: "40px",
                          aspectRatio: 1,
                          backgroundColor: ratingColor,
                        }}
                      ></div>
                    )}
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
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
