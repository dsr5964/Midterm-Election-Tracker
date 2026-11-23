import type { PoliticalParty } from "../../../types/types";
import "../../../App.css";
import { useEffect, useState } from "react";

type CandidateAvatarProps = {
  name: string;
  party: PoliticalParty;
  timeoutMs?: number;
};
export default function CandidateAvatar({
  name,
  party,
  timeoutMs = 3000,
}: CandidateAvatarProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const timeout = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    const fetchImage = async () => {
      try {
        setLoading(true);
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`;
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        setLoading(false);

        if (!res.ok) throw new Error(`Network response failed`);
        if (res.status === 302) {
          setImgUrl(null);
          controller.abort();
          return;
        }
        if (res.status === 404) {
          setImgUrl(null);
          controller.abort();
          return;
        } else {
          const data = await res.json();
          const imgUrl = data.thumbnail.source;

          // This is to avoid an image being displayed that is not a portrait
          // For some candidates the page would get redirected to another page which would display
          // a picture for example the election result map. This is not preferred.
          const title: string = data.title;
          if (title !== name) {
            setImgUrl(null);
            setLoading(false);
            return;
          }
          if (!cancelled) {
            setImgUrl(imgUrl ?? null);
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
      clearTimeout(timeoutMs);
      controller.abort();
    };
  }, [name, imgUrl, timeoutMs]);

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
          onError={(e) => {
            e.currentTarget.onerror = null;
            setImgUrl(null);
          }}
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
