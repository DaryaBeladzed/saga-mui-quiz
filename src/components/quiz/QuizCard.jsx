import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { quizActions } from "../../store/slices/quiz";
import QuizTimer from "./QuizTimer";

const QuizCard = ({ category, question, ind }) => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prevState) => prevState + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [question]);

  const answerHandler = (ans) => {
    console.log(ans);
    dispatch(quizActions.setAnswer({ ans, ind }));
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        width: "100%",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            variant="subtitle1"
            color={`${category.color}.dark`}
            gutterBottom
          >
            Category: {category.text}
          </Typography>
          <QuizTimer
            progress={progress}
            max={question.type === "boolean" ? 10 : 15}
          />
        </Stack>
        <Typography
          variant="h5"
          component="p"
          dangerouslySetInnerHTML={{
            __html: question.question,
          }}
        />
      </CardContent>
      {question.type === "boolean" && (
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: 7,
          }}
        >
          <Button size="large" onClick={() => answerHandler("True")}>
            True
          </Button>
          <Button size="large" onClick={() => answerHandler("False")}>
            False
          </Button>
        </CardActions>
      )}
      {question.type === "multiple" && (
        <CardActions
          sx={{
            marginTop: 3,
            paddingLeft: 3,
          }}
        >
          <RadioGroup
            name="answers"
            value={null}
            onChange={(e) => answerHandler(e.target.value)}
          >
            {[...question.incorrect_answers, question.correct_answer]
              .sort()
              .map((ans, ind) => (
                <FormControlLabel
                  key={ind}
                  value={ans}
                  control={<Radio />}
                  label={
                    <Typography
                      component="p"
                      dangerouslySetInnerHTML={{
                        __html: ans,
                      }}
                    />
                  }
                />
              ))}
          </RadioGroup>
        </CardActions>
      )}
    </Card>
  );
};

export default QuizCard;
