import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const QuizTimer = ({ progress, max }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value={(progress * 100) / max} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {progress}
        </Typography>
      </Box>
    </Box>
  );
};

export default QuizTimer;
