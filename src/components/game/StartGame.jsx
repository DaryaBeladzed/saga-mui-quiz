import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CATEGORIES, DIFFICULTIES, QUIZ_TYPE } from "../../utils/constants";
import { gameActions } from "../../store/slices/game";
import SelectQuizOptions from "../quiz/SelectQuizOptions";

const StartGame = () => {
  const [numberError, setNumberError] = useState(false);
  const [number, setNumber] = useState(10);
  const [category, setCategory] = useState({
    id: CATEGORIES[0].id,
    color: CATEGORIES[0].color,
  });
  const [difficulty, setDifficulty] = useState("any");
  const [type, setType] = useState("boolean");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const startGameHandler = (e) => {
    e.preventDefault();

    const payload = {
      numberOfQuestion: number,
      category: category.id,
      difficulty: difficulty,
      type: type,
      username: username,
    };
    dispatch(gameActions.startGame(payload));
  };

  return (
    <Stack
      bgcolor={"background.default"}
      color={"text.primary"}
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      component="form"
      p={3}
      onSubmit={startGameHandler}
    >
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">Customise quiz</Typography>
        <TextField
          id="number-of-questions"
          label="Number of questions"
          type="number"
          value={number}
          margin="normal"
          inputProps={{ min: 10, max: 50 }}
          error={numberError}
          helperText="Please choose number >= 10 and <= 50"
          onChange={(e) => {
            setNumberError(e.target.value < 10);
            setNumber(e.target.value);
          }}
          sx={{ maxWidth: 350 }}
        />
        <SelectQuizOptions
          id="category"
          text="Category"
          value={category.id}
          onChange={(e) =>
            setCategory({
              id: e.target.value,
              color: CATEGORIES.filter((cat) => cat.id === e.target.value)[0]
                .color,
            })
          }
          items={CATEGORIES}
          color={category.color}
        />
        <SelectQuizOptions
          id="difficulty"
          text="Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          items={DIFFICULTIES}
        />
        <SelectQuizOptions
          id="type"
          text="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          items={QUIZ_TYPE}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          id="username"
          label="Username"
          variant="standard"
          value={username}
          margin="normal"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          sx={{ maxWidth: 350, width: "50%" }}
        />

        <Button variant="contained" type="submit" sx={{ marginY: 2 }}>
          Start quiz
        </Button>
      </Box>
    </Stack>
  );
};

export default StartGame;
