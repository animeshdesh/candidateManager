import { CircularProgress, Typography } from "@mui/material";

const Loading = () => {
  return (
    <div style={{ display: "flex", gap: "25px" }}>
      <Typography variant="h3">Loading...</Typography>
      <CircularProgress />
    </div>
  );
};

export default Loading;
