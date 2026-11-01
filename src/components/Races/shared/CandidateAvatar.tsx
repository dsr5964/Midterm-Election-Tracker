import type { PoliticalParty } from "../../../types/types";
import "../../../App.css";
import { useEffect, useState } from "react";

type CandidateAvatarProps = {
  name: string;
  party: PoliticalParty;
};
export default function CandidateAvatar({ name, party }: CandidateAvatarProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const fetchImage = async () => {
      try {
        setLoading(true);
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`;
        const res = await fetch(url);
        setLoading(false);
        if (res.status === 404) {
          setImgUrl(null);
          return;
        } else {
          const data = await res.json();
          if (!cancelled) {
            setImgUrl(data.thumbnail?.source ?? null);
            setLoading(false);
          }
        }
      } catch {
        if (!cancelled) {
          setImgUrl(null);
          setLoading(false);
        }
      }
    };

    fetchImage();

    return () => {
      cancelled = true;
    };
  }, [name, imgUrl]);
  function renderAvatar() {
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
            : party === "G"
              ? "#17aa5c"
              : party === "L"
                ? "#fed000"
                : "black";
    return (
      <div
        style={{
          borderRadius: "50%",
          height: "150px",
          width: "150px",
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          flexShrink: 0,
          color: "white",
          fontSize: "36px",
        }}
      >
        {initials}
      </div>
    );
  }

  function renderCandidateProfile() {
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <img
          src={imgUrl!}
          loading="lazy"
          alt={name}
          width="150px"
          style={{
            borderRadius: "75%",
          }}
          onError={() => setImgUrl(null)}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          backgroundColor: "#e0e0e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          color: "#888",
        }}
      >
        Loading...
      </div>
    );
  }

  return <>{imgUrl ? renderCandidateProfile() : renderAvatar()}</>;
}
