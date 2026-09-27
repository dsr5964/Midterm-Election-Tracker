import {
  ComposableMap,
  Geographies,
  Geography,
} from "@vnedyalk0v/react19-simple-maps";
import allStateAbbrevs from "../data/stateabbrevs.json";
import geoData from "../data/states-10m.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { BackButton } from "./BackButton";
import type {
  Candidate,
  District,
  DistrictData,
  HouseState,
  Incumbent,
  PoliticalParty,
  RaceType,
  Rating,
  State,
  StateAbbr,
} from "../types/types";
import {
  NO_RACE_COLOR,
  SAFE_R,
  LIKELY_R,
  LEAN_R,
  TILT_R,
  SAFE_D,
  LIKELY_D,
  LEAN_D,
  TILT_D,
  TOSSUP,
  ratingToValueMap,
  stripeConfigs,
  buttonNames,
} from "../constants";
import "../App.css";
import Key from "./Key";
import { getRatingColor } from "../utils/stateUtils";

// const initState: State = {
//   id: "",
//   name: "",
//   rating: undefined,
//   abbrev: undefined,
//   candidates: [],
//   incumbent: undefined,
//   flip: false,
// };

const initHouseState: HouseState = {
  id: "",
  name: "",
  abbrev: undefined,
  districts: [],
  statePartyControl: { democrat: 0, republican: 0, independent: 0 },
};

function renderCurrentPartyComposition(data, raceType: RaceType) {
  const currentComposition = data.currentComposition[raceType];
  const partyKeys = Object.keys(currentComposition);
  return (
    <div>
      Current Composition
      <div style={{ display: "flex" }}>
        {partyKeys.map((key) => {
          const partyColor = key === "Democrat" ? "#052fd6" : "#d60819";
          return (
            <span
              style={{
                backgroundColor: partyColor,
                fontWeight: "bold",
                color: "white",
                padding: "10px",
                borderRadius: "10px",
                margin: "10px",
              }}
            >
              {key}s {currentComposition[key]}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function getSenateGovernorState(data, stateId: string): State | undefined {
  const individualState = allStateAbbrevs.find(
    (state) => state.val === stateId,
  );

  if (individualState) {
    const stateKey = individualState.id as keyof typeof data.states;

    if (stateKey in data.states) {
      const stateName = data.states[stateKey].name;
      const ratings: string[] = data.states[stateKey].race.ratings;
      const rating = getRating(ratings);

      const candidates: Candidate[] = getCandidates(
        data.states[stateKey].race.candidates,
      );
      const incumbent: Incumbent = getIncumbent(
        data.states[stateKey].race.incumbent,
      );

      const isFlip = checkIsFlip(incumbent.party, rating);

      const state = {
        id: stateId,
        abbrev: individualState.id as StateAbbr,
        name: stateName,
        rating: rating,
        candidates: candidates,
        incumbent: incumbent,
        flip: isFlip,
      };
      return state;
    }
  }
}

function getRepresentativeSeatCountByParty(districtData: District[]) {
  let democratSeatCount: number = 0;
  let republicanSeatCount: number = 0;
  let independentSeatCount: number = 0;

  const values = districtData.flatMap((district) => Object.values(district));
  values.forEach((value) => {
    const incumbentParty = value.incumbent ? value.incumbent.party : "";
    switch (incumbentParty) {
      case "D": {
        democratSeatCount += 1;
        return;
      }
      case "R": {
        republicanSeatCount += 1;
        return;
      }
      case "I": {
        independentSeatCount += 1;
        return;
      }
      default: {
        return;
      }
    }
  });

  return {
    democrat: democratSeatCount,
    republican: republicanSeatCount,
    independent: independentSeatCount,
  };
}

function getHouseState(data, stateId: string): HouseState | undefined {
  const individualState = allStateAbbrevs.find(
    (state) => state.val === stateId,
  );

  if (individualState) {
    const stateKey = individualState.id as keyof typeof data.states;

    if (stateKey in data.states) {
      const stateData = data.states[stateKey];
      const stateName = data.states[stateKey].name;

      const houseDistrictsArray: District[] = [];

      for (const dataRecord of stateData.race.districts) {
        const congressionalDistrict = Object.keys(dataRecord)[0];
        const recordValues = Object.values(dataRecord)[0];
        const rating = getRating(recordValues.ratings);
        const incumbentParty: PoliticalParty = recordValues.incumbent.party;
        const isFlip = checkIsFlip(incumbentParty, rating);
        const districtData: DistrictData = {
          rating: rating,
          mustWatch: recordValues.mustWatch,
          incumbent: recordValues.incumbent,
          candidates: recordValues.candidates,
          flip: isFlip,
        };

        const district: District = { [congressionalDistrict]: districtData };

        houseDistrictsArray.push(district);
      }

      const partyControl =
        getRepresentativeSeatCountByParty(houseDistrictsArray);

      const houseState: HouseState = {
        id: stateKey,
        abbrev: individualState.id as StateAbbr,
        name: stateName,
        districts: houseDistrictsArray,
        statePartyControl: partyControl,
      } as HouseState;

      return houseState;
    }
  }
}

function getState(
  data: unknown,
  stateId: string,
  layer: RaceType,
): State | HouseState | undefined {
  if (layer === "senate" || layer === "governor") {
    const state = getSenateGovernorState(data, stateId);
    if (!state) return;

    return state;
  } else {
    const houseState = getHouseState(data, stateId);
    if (!houseState) return;

    return houseState;
  }
}

function getCandidates(candidateData: Candidate[]): Candidate[] {
  const candidates: Candidate[] = candidateData.map((candidate: Candidate) => {
    return {
      name: candidate.name,
      party: candidate.party,
      isIncumbent: candidate.status === "incumbent" ? true : false,
      status: candidate.status,
    };
  });
  return candidates;
}

function getIncumbent(incumbentData: Incumbent): Incumbent {
  return {
    name: incumbentData.name,
    party: incumbentData.party,
    retiring: incumbentData.retiring ? true : false,
    firstElected: incumbentData.firstElected,
    note: incumbentData.note,
    vacant: !incumbentData ? true : false,
  } as Incumbent;
}

function calculateAverageRating(ratings: string[]): number {
  const ratingValue = ratings.reduce((accumulator, currentRating) => {
    const ratingValue = ratingToValueMap[currentRating];
    return accumulator + ratingValue;
  }, 0);
  return ratingValue / ratings.length;
}

function getRating(ratings: string[]): Rating {
  const ratingValue = calculateAverageRating(ratings);
  switch (true) {
    case ratingValue >= 2.5:
      return SAFE_D;
    case ratingValue <= -2.5:
      return SAFE_R;
    case ratingValue >= 1.5:
      return LIKELY_D;
    case ratingValue <= -1.5:
      return LIKELY_R;
    case ratingValue >= 0.75:
      return LEAN_D;
    case ratingValue <= -0.75:
      return LEAN_R;
    case ratingValue >= 0.25:
      return TILT_D;
    case ratingValue <= -0.25:
      return TILT_R;
    default:
      return TOSSUP;
  }
}

function getStateColorFromIncumbent(incumbent: Incumbent): string {
  const termLimited = incumbent.note === "Term-limited"; // This is for gubernatorial races
  switch (incumbent.party) {
    case "D":
      if (incumbent.retiring || termLimited) {
        return "#0671B0";
      } else if (incumbent.vacant) {
        return "#808080";
      } else {
        return "#92C5DE";
      }

    case "R":
      if (incumbent.retiring || termLimited) {
        return "#CA0020";
      } else if (incumbent.vacant) {
        return "#808080";
      } else {
        return "#F48882";
      }
    case "I":
      if (incumbent.retiring || termLimited) {
        return "#666966";
      } else if (incumbent.vacant) {
        return "#808080";
      } else {
        return "#999699";
      }
  }
}

function getStateColorFromPartyControl(partyControl: {
  democrat: number;
  republican: number;
  independent: number;
}) {
  if (partyControl.democrat > partyControl.republican) {
    return "#0044C9";
  }
  if (partyControl.republican > partyControl.democrat) {
    return "#E81B23";
  }

  return "#9932CC";
}

function checkIsFlip(incumbentParty: PoliticalParty, rating: string) {
  switch (incumbentParty) {
    case "R": {
      if (rating.includes("d")) {
        return true;
      }
      break;
    }
    case "D": {
      if (rating.includes("r")) {
        return true;
      }
      break;
    }
    case "I": {
      if (rating.includes("r") || rating.includes("d")) {
        return true;
      }
      break;
    }
    default:
      return false;
  }
  return false;
}

type ElectionMapArgs = {
  data: unknown;
  title: string;
};

export default function ElectionMap({ data, title }: ElectionMapArgs) {
  const navigate = useNavigate();
  const [stateData, setStateData] = useState<State | HouseState>(
    initHouseState,
  );
  const [toggleIncumbents, setToggleIncumbents] = useState<boolean>(false);

  function getStateColorBasedOnRace(stateData: HouseState | State) {
    if ("districts" in stateData) {
      return getStateColorFromPartyControl(stateData.statePartyControl);
    } else {
      const stateIncumbent: Incumbent | null =
        "incumbent" in stateData ? stateData.incumbent! : null;
      const rating: Rating | null | undefined =
        "rating" in stateData ? stateData.rating : undefined;

      // TODO cleaner way of guaranteeing rating and incumbent exist to get state color
      if (stateIncumbent && rating) {
        const stateColor = toggleIncumbents
          ? getStateColorFromIncumbent(stateData.incumbent!)
          : getRatingColor(rating!);
        return stateColor;
      }
      return "";
    }
  }

  const raceType = title.toLowerCase();
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {buttonNames.map((name) => {
          if (name !== raceType) {
            return <button onClick={() => navigate(`/${name}`)}>{name}</button>;
          }
        })}
        <BackButton />
      </div>
      <h1>{title} Map 2026</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>{renderCurrentPartyComposition(data, raceType as RaceType)}</div>
      </div>
      {raceType !== "house" && (
        <button onClick={() => setToggleIncumbents(!toggleIncumbents)}>
          {toggleIncumbents ? `Midterm Election Matchups` : `Incumbents`}
        </button>
      )}
      <div style={{ width: "800px", maxWidth: "960px", margin: "0 auto" }}>
        <ComposableMap
          projection="geoAlbersUsa"
          width={800}
          height={500}
          style={{ width: "100%", height: "auto" }}
          projectionConfig={{ scale: 1000 }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <defs>
            {Object.entries(stripeConfigs).map(([partyKey, config]) => (
              <pattern
                key={partyKey}
                id={`diagonal-stripe-${partyKey}`}
                patternUnits="userSpaceOnUse"
                width="10"
                height="10"
                patternTransform="rotate(-45)"
              >
                <rect width="10" height="10" fill={config.background} />
                <line
                  x1="0"
                  y1="0"
                  y2="10"
                  stroke={config.line}
                  strokeWidth={8}
                />
              </pattern>
            ))}
          </defs>
          <Geographies geography={geoData}>
            {({ geographies }) => {
              return geographies.map((geo) => {
                const raceType = title.toLowerCase() as RaceType;
                const state = getState(data, geo.id, raceType);
                if (!state) {
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: NO_RACE_COLOR,
                          outline: "none",
                          pointerEvents: "none",
                          boxShadow: "10px 10px",
                        },
                        hover: {
                          fill: NO_RACE_COLOR,
                          outline: "none",
                        },
                        pressed: {
                          fill: NO_RACE_COLOR,
                          outline: "none",
                        },
                      }}
                    ></Geography>
                  );
                }

                const rating: Rating | null =
                  "rating" in state ? state.rating! : null;
                const flip: boolean = "flip" in state ? state.flip : false;
                const stateColor: string = getStateColorBasedOnRace(state);

                const patternFill = `url(#diagonal-stripe-${rating})`;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={stateColor}
                    stroke="white"
                    strokeWidth={1}
                    style={{
                      default: {
                        fill:
                          flip && !toggleIncumbents ? patternFill : stateColor,
                        outline: "black",
                        cursor: "pointer",
                      },
                      hover: {
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        outline: "none",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => setStateData(state)}
                  />
                );
              });
            }}
          </Geographies>
        </ComposableMap>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          stateData={stateData}
          toggleIncumbents={toggleIncumbents}
          raceType={raceType as RaceType}
        />
        {<Key toggleIncumbents={toggleIncumbents} electionType={title} />}
      </div>
    </div>
  );
}
