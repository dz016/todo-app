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
import Edit from "./screens/edit/edit";
import UserProfileForm from "./screens/UserProfileForm/UserProfileForm";

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
            {/* <InitState></InitState> */}
            <Routes>
              <Route path="/login"></Route>
              <Route path="/signup"></Route>
              <Route
                path="/landing"
                element={<LandingPage></LandingPage>}
              ></Route>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/create" element={<Create></Create>}></Route>
              <Route path="/edit/:id" element={<Edit></Edit>}></Route>
              <Route
                path="/user/edit/:id"
                element={<UserProfileForm></UserProfileForm>}
              ></Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function InitState() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const init = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.username) {
        setAuth({ token: data.token, username: data.username });
      } else {
        navigate("/landing");
      }
    } catch (e) {
      navigate("/landing");
    }
  };
  useEffect(() => {
    // Make the useEffect function asynchronous and use await for the async operation
    const initialize = async () => {
      await init();
    };

    initialize();
  }, []);
  return <></>;
}

export default App;
