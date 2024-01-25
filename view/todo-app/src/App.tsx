import Home from "./screens/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import LandingPage from "./screens/LandingPage/LandingPage";

import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a21b72",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login"></Route>
            <Route path="/signup"></Route>
            <Route path="/" element={<LandingPage></LandingPage>}></Route>
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/create"></Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
