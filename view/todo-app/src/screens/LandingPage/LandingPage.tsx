import Grid from "@mui/material/Grid";
import LandingLeft from "../../component/LandingLeft/Landingleft";
import LandingRight from "../../component/LandingRight/LandingRight";

const LandingPage = () => {
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: "flex",
            justifyContent: "center",

            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              width: "78%",

              height: "70vh",
              justifyContent: "space-evenly",

              display: "flex",
              flexDirection: "column",
              gap: "2rem",

              alignItems: "center",
            }}
          >
            <LandingLeft />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
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
