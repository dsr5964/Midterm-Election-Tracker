import type { PoliticalParty } from "../../../types/types";
import "../../../App.css";

type CandidateAvatarProps = {
  name: string;
  party: PoliticalParty;
};
export default function CandidateAvatar({ name, party }: CandidateAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  const color =
    party === "D"
      ? "#052fd6"
      : party === "R"
        ? "#d60819"
        : party === "I"
          ? "#9932cc"
          : "black";
  return (
    <div
      style={{
        borderRadius: "50%",
        height: "100px",
        width: "100px",
        backgroundColor: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        flexShrink: 0,
        color: "white",
      }}
    >
      {initials}
    </div>
  );
}
