import Grid from "@mui/material/Grid";
import LandingLeft from "../../component/LandingLeft/Landingleft";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LandingRight from "../../component/LandingRight/LandingRight";

const LandingPage = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={7.5}>
          <LandingLeft />
        </Grid>
        <Grid
          item
          xs={12}
          md={4.5}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            style={{ color: "white", padding: "2rem", alignSelf: "flex-end" }}
          >
            {" "}
            <Stack direction="row" spacing={2}>
              <Button sx={{ color: "white" }}>home</Button>

              <Button sx={{ color: "white" }}>about</Button>
            </Stack>
          </div>
          <div
            style={{
              maxWidth: "75%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <LandingRight />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default LandingPage;
