import InputAdornment from "@mui/material/InputAdornment";
import { Button, Divider, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { TextField } from "@mui/material";

const LandingLeft = () => {
  return (
    <>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          flexDirection: "column",
          height: "10vh",
          backgroundColor: "#c5ebe6",
          borderRadius: "9px",
          boxShadow: "-8px 11px 85px -31px rgba(0,0,0,0.35)",

          padding: "10rem 5rem",
        }}
      >
        <TextField
          id="input-with-icon-textfield"
          label="Username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
          color="success"
          size="medium"
        />
        <TextField
          id="input-with-icon-textfield"
          label="Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
          color="success"
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button variant="contained" color="success" size="small">
            {" "}
            login
          </Button>
          <div style={{ height: "0.5rem" }}></div>

          <Typography>OR</Typography>

          <div style={{ height: "0.5rem" }}></div>

          <Button variant="contained" color="success" size="small">
            {" "}
            sign up
          </Button>
        </div>
      </form>
    </>
  );
};

export default LandingLeft;
