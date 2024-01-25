import { Typography } from "@mui/material";

const LandingLeft = () => {
  return (
    <>
      <div>
        <img
          src={"../asset/Untitled design (1).png"}
          alt="Description"
          loading="lazy"
          style={{ transform: "scale(1.3)" }}
        />
      </div>
      <div>
        <Typography
          variant="h4"
          sx={{ color: "#0c2623", fontFamily: "'Poor Story'" }}
        >
          Elevate your productivity with our sleek and simple todo app{" "}
        </Typography>
      </div>
    </>
  );
};

export default LandingLeft;
