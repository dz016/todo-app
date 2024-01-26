import Home from "./screens/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingPage from "./screens/LandingPage/LandingPage";

import CssBaseline from "@mui/material/CssBaseline";
import Create from "./screens/create";

const theme = createTheme({
  palette: {
    mode: "dark",
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
            <Route
              path="/landing"
              element={<LandingPage></LandingPage>}
            ></Route>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/create" element={<Create></Create>}></Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
