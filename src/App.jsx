import Chat from "./pages/Chat";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useStore from "./store/useStore.jsx";

function App() {
  const { appTheme } = useStore((s) => s);

  const darkTheme = createTheme({
    palette: {
      mode: appTheme,
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Chat />
      </ThemeProvider>
    </>
  );
}

export default App;
