import { Typography } from "@mui/material";

type FooterProps = {
  date: string;
};
export default function Footer({ date }: FooterProps) {
  return (
    <>
      <Typography>
        Ratings and candidates as of {date}. Not live results.
      </Typography>
      <Typography>
        Data sourced from{" "}
        <span>
          <a
            href="https://ballotpedia.org/United_States_Congress_elections,_2026"
            target="_blank"
          >
            Ballotpedia
          </a>
          <span> and </span>
          <a
            href="https://en.wikipedia.org/wiki/2026_United_States_elections"
            target="_blank"
          >
            Wikipedia.
          </a>
        </span>
      </Typography>
      <Typography>
        Map from{" "}
        <a
          href="https://github.com/vnedyalk0v/react19-simple-maps"
          target="_blank"
        >
          repository
        </a>{" "}
        by{" "}
        <span>
          <a href="https://github.com/vnedyalk0v" target="_blank">
            vnedyalk0v
          </a>
        </span>{" "}
      </Typography>
      <Typography>
        Follow and check out the developer on{" "}
        <a href="https://www.linkedin.com/in/dan-rigoglioso/" target="_blank">
          LinkedIn!
        </a>
      </Typography>
    </>
  );
}
