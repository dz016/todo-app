import Home from "./screens/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingPage from "./screens/LandingPage/LandingPage";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import CssBaseline from "@mui/material/CssBaseline";
import Create from "./screens/create";
import { authState } from "./store/state_recoil";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Edit from "./screens/edit/edit";
import UserProfileForm from "./screens/UserProfileForm/UserProfileForm";
import { user, isLoggedIn } from "./store/state_recoil";

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
function InitState() {
  const setUser = useSetRecoilState(user);
  const isLogedin = useSetRecoilState(isLoggedIn);
  const setAuth = useSetRecoilState(authState);

  // const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  console.log("init state");
  const token = localStorage.getItem("token") || "";

  const init = async () => {
    console.log("init func");

    try {
      const response = await fetch("http://localhost:3000/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.username) {
        setAuth({ token, username: data.username });
        setUser(data);
        isLogedin(true);
        navigate("/");
        console.log(data);
      } else {
        navigate("/landing");
      }
    } catch (e) {
      navigate("/landing");
    }
  };
  useEffect(() => {
    // Make the useEffect function asynchronous and use await for the async operation

    init();
  }, [token]);
  return <></>;
}

export default App;
