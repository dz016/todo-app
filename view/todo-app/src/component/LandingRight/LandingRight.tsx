import { Card, CardContent, Typography, Link } from "@mui/material";
import { useState } from "react";
import Login from "./loginform";
import Signup from "./signinForm";

const LandingLeft = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <>
      <Card sx={{ width: "20rem" }}>
        <CardContent>
          <Typography
            variant="h5"
            color={"error"}
            sx={{
              fontSize: "1.5rem",
              fontWeight: "700",
              fontFamily: " 'Rubik' ,sans-serif",
              lineHeight: "1.05",
            }}
          >
            {isSignIn ? "Login " : "Signup"}
          </Typography>
          <Typography variant="body2" color={"#666"} gutterBottom>
            {isSignIn
              ? "Welcome back! Login to continue "
              : "Create an account! "}
          </Typography>
          <div style={{ height: "1rem" }}></div>
          {isSignIn ? (
            <Login isSignIn={isSignIn}></Login>
          ) : (
            <Signup isSignIn={isSignIn}></Signup>
          )}

          <div style={{ height: "1rem" }}></div>
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "10px" }}
          >
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <Link component="button" color={"error"} onClick={handleToggle}>
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default LandingLeft;
