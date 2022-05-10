import { ThemeProvider } from "@emotion/react";
import { CircularProgress, createTheme, Modal } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import EndGamePage from "./pages/EndGamePage";
import GamePage from "./pages/GamePage";
import StartGamePage from "./pages/StartGamePage";
import { END_GAME, GAME, START_GAME } from "./utils/constants";

function App() {
  const stage = useSelector((state) => state.game.stage);
  const isLoading = useSelector((state) => state.game.isLoading);
  const [mode, setMode] = useState("light");

  const customTheme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#279bc0",
      },
      ...(mode === "dark" && {
        background: {
          default: "#001e3c",
          paper: "#001e3c",
        },
      }),
    },
  });

  let content;
  switch (stage) {
    case START_GAME: {
      content = <StartGamePage />;
      break;
    }
    case GAME: {
      content = <GamePage />;
      break;
    }
    case END_GAME: {
      content = <EndGamePage />;
      break;
    }
    default:
      break;
  }
  return (
    <ThemeProvider theme={customTheme}>
      <Header setMode={setMode} />
      {content}
      <Modal open={isLoading}>
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Modal>
    </ThemeProvider>
  );
}

export default App;
