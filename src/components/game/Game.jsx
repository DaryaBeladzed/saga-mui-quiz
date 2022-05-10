import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../../store/slices/game";
import { CATEGORIES } from "../../utils/constants";
import QuizProgress from "../quiz/QuizProgress";
import QuizCard from "../quiz/QuizCard";

const Game = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.quiz.questions);
  const currentInd = useSelector((state) => state.quiz.currentInd);
  const category = questions[currentInd]
    ? CATEGORIES.filter((cat) =>
        questions[currentInd].category.includes(cat.text)
      )[0]
    : null;

  return (
    <Stack
      bgcolor={"background.default"}
      color={"text.primary"}
      direction="column"
      alignItems="flex-end"
      spacing={2}
      p={3}
    >
      {!questions[currentInd] && (
        <Typography variant="subtitle1" gutterBottom>
          We have no questions. Please change quiz options.
        </Typography>
      )}
      {questions[currentInd] && (
        <>
          <QuizProgress
            ind={currentInd}
            max={questions.length}
            color={category.color}
          />
          <QuizCard category={category} question={questions[currentInd]} ind={currentInd} />
        </>
      )}
      <Button
        color="error"
        size="medium"
        onClick={() => dispatch(gameActions.endGame())}
      >
        Quit game
      </Button>
    </Stack>
  );
};

export default Game;
