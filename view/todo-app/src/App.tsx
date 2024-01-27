import Home from "./screens/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingPage from "./screens/LandingPage/LandingPage";
import { RecoilRoot, useSetRecoilState } from "recoil";
import CssBaseline from "@mui/material/CssBaseline";
import Create from "./screens/create";
import { authState } from "./store/state_recoil";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <InitState></InitState>
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
      </RecoilRoot>
    </>
  );
}
function InitState() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const init = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.username) {
        setAuth({ token: data.token, username: data.username });
        navigate("/todos");
      } else {
        navigate("/landing");
      }
    } catch (e) {
      navigate("/landing");
    }
  };
  useEffect(() => {
    init();
  }, []);
  return <></>;
}

export default App;
