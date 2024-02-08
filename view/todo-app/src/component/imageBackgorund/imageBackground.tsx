import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Typography, Button } from "@mui/material";

const useStyles = makeStyles({
  root: {
    position: "relative",
    overflow: "hidden",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    background: `linear-gradient(to right top, rgba(20, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0.3)), url("")`, // Adjust the gradient and image URL as needed
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  content: {
    textAlign: "center",
    zIndex: 1,
    marginTop: 16, // Replace with your desired spacing value
  },
  button: {
    marginTop: 16, // Replace with your desired spacing value
  },
});

const FadingBackground = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md" className={classes.content}>
        <Typography
          variant="h2"
          sx={{
            fontSize: "4.8rem",
            fontWeight: "800",
            fontFamily: " 'Rubik' ,sans-serif",
            lineHeight: "1.05",
            letterSpacing: "-0.1rem",
          }}
          gutterBottom
        >
          Remind
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: "4.8rem",
            fontWeight: "600",
            fontFamily: " 'Rubik' ,sans-serif",
            lineHeight: "1.05",
            color: "error.main",
          }}
        >
          TODO/
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: "4.8rem",
            fontWeight: "600",
            fontFamily: " 'Rubik' ,sans-serif",
            lineHeight: "1.05",
          }}
        >
          Done
        </Typography>
      </Container>
    </div>
  );
};

export default FadingBackground;
