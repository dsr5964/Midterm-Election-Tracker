import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BlankMap from "./BlankMap";
export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Stack>
          <Typography
            sx={{
              fontSize: 48,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Welcome to Election Night 2026
          </Typography>
          <Typography>Click to start viewing the different races</Typography>
          <Box>
            <button onClick={() => navigate("/senate")}>Senate</button>
            <button onClick={() => navigate("/governor")}>Governor</button>
            <button onClick={() => navigate("/house")}>House</button>
          </Box>
        </Stack>
      </div>
      <BlankMap />
    </>
  );
}
