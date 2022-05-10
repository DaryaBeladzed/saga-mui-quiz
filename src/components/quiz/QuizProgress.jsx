import { Slider } from "@mui/material";
import React from "react";

const QuizProgress = ({ ind, max, color }) => {
  return (
    <Slider
      aria-label="Progress"
      value={ind + 1}
      step={1}
      marks
      min={0}
      max={max}
      disabled
      componentsProps={{
        thumb: {
          sx: {
            // color: `${color}.dark`,
            color: "info.dark",
          },
        },
        rail: { sx: { color: (theme) => theme.palette.primary.dark } },
        track: { sx: { color: (theme) => theme.palette.primary.main } },
        mark: { sx: { color: (theme) => theme.palette.primary.dark } },
      }}
    />
  );
};

export default QuizProgress;
