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
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`;
        const res = await fetch(url);
        console.log(res.status);
        if (res.status === 404) {
          console.log("entering if");
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
  }, [name]);
  function renderAvatar() {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 3);
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

  function renderCandidateProfile() {
    if (loading === true) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <img
          src={imgUrl!}
          loading="lazy"
          alt={name}
          width="100px"
          style={{
            borderRadius: "75%",
          }}
          onError={() => setImgUrl(null)}
        />
      </div>
    );
  }

  if (loading) {
    return <div>{renderCandidateProfile()}</div>;
  }

  return <>{imgUrl ? renderCandidateProfile() : renderAvatar()}</>;
}
