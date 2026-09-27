import { CCard, CCardBody, CCardText, CCardTitle, CRow } from "@coreui/react";
import type { ReactNode } from "react";
import {
  type Candidate,
  type HouseState,
  type Incumbent,
  type PartyGroup,
  type PoliticalParty,
  type RaceType,
  type State,
} from "../types/types";
import { PARTY_LABELS } from "../constants";
import { getRatingColor } from "../utils/stateUtils";

function displayCongressionalDistrictsByState(houseData: HouseState) {
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
                <div
                  className={`${democratFlip} ${republicanFlip}`}
                  style={{
                    width: "30px",
                    aspectRatio: 1,
                    backgroundColor: ratingColor,
                  }}
                ></div>
              </div>

              <div>{displayCandidateData(districtData.candidates)}</div>
            </div>
          );
        }
      })}
    </>
  );
}

function groupCandidatesByParty(candidates: Candidate[]): PartyGroup[] {
  const partyMap = new Map<string, Candidate[]>();
  for (const candidate of candidates) {
    if (!partyMap.has(candidate.party)) {
      partyMap.set(candidate.party, []);
    }
    partyMap.get(candidate.party)!.push(candidate);
  }
  return Array.from(partyMap.entries()).map(([party, candidates]) => ({
    party,
    candidates,
    isPrimary: candidates.some(
      (candidate) => candidate.status === "primary-tbd",
    ),
  }));
}

function displayCandidateData(
  candidateData: Candidate[] | undefined,
  primaryDate?: string,
): ReactNode {
  if (!candidateData || candidateData.length === 0) {
    return <CCardText>No candidates yet</CCardText>;
  }

  const groups = groupCandidatesByParty(candidateData);

  return (
    <>
      {groups.map((group) => (
        <>
          <strong>
            {group.isPrimary
              ? `${PARTY_LABELS[group.party as PoliticalParty]} Primary`
              : ""}
          </strong>
          {group.candidates.map((candidate, index) => (
            <CCardText
              className={`${PARTY_LABELS[candidate.party]}-text`}
              key={index}
            >
              {group.isPrimary
                ? `${candidate.name}`
                : `${candidate.name} (${candidate.party})`}
            </CCardText>
          ))}
        </>
      ))}
    </>
  );
}

function displayIncumbentData(incumbentData: Incumbent | undefined): ReactNode {
  if (!incumbentData) {
    return <CCardText>Vacant seat - no incumbent</CCardText>;
  }
  return (
    <>
      <CCardText>Incumbent: {incumbentData.name}</CCardText>
      <CCardText>Political Party: {incumbentData.party}</CCardText>
      <CCardText>First elected: {incumbentData.firstElected}</CCardText>
    </>
  );
}

interface CardProps {
  stateData: State | HouseState;
  toggleIncumbents: boolean;
  raceType: RaceType;
}

// TODO: Add a badge for flips
// TODO: Add a badge for the rating
function Card({ stateData, toggleIncumbents, raceType }: CardProps) {
  const incumbent: Incumbent | undefined =
    "incumbent" in stateData ? stateData.incumbent! : undefined;
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
          {raceType === "house" ? (
            displayCongressionalDistrictsByState(stateData as HouseState)
          ) : (
            <></>
          )}
          {raceType !== "house" &&
            (toggleIncumbents
              ? displayIncumbentData(incumbent)
              : displayCandidateData(candidates))}
        </CCardBody>
      </CCard>
    </CRow>
  );
}

export default Card;
