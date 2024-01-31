import Grid from "@mui/material/Grid";
import LandingLeft from "../../component/LandingLeft/Landingleft";
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
