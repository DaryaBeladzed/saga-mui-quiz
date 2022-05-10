import {
  Button,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TableHead,
  Table,
  Paper,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../../store/slices/game";

const EndGame = () => {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.quiz.score);
  const questionsNumber = useSelector((state) => state.quiz.questions).length;
  const answers = useSelector((state) => state.quiz.answers);
  const username = useSelector((state) => state.game.username);

  return (
    <Stack
      bgcolor={"background.default"}
      color={"text.primary"}
      direction="column"
      alignItems="center"
      spacing={2}
      p={3}
    >
      <Typography variant="h5" gutterBottom>
        Results
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
      >
        <Typography variant="subtitle1" gutterBottom>
          {username}, your score:{" "}
          <Typography
            component="b"
            sx={{ fontWeight: 900, color: "info.main" }}
          >
            {score}/{questionsNumber}
          </Typography>
        </Typography>
        <Button
          onClick={() => dispatch(gameActions.restartGame())}
          color="info"
          size="medium"
        >
          Try again
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell width="70%">Question</TableCell>
              <TableCell align="right">Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {answers.map((ans, ind) => (
              <TableRow
                key={ind}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor:
                    ans.answer === ans.correctAnswer ? "success.light" : "",
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography
                    component="p"
                    dangerouslySetInnerHTML={{
                      __html: ans.question,
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  {ans.answer}
                  {ans.answer !== ans.correctAnswer && (
                    <Typography
                      component="p"
                      dangerouslySetInnerHTML={{
                        __html: `Correct answer: ${ans.correctAnswer}`,
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default EndGame;
