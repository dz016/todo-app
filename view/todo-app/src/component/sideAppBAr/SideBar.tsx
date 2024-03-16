import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, alpha } from "@mui/material/styles";
import List from "@mui/material/List";
import InputBase from "@mui/material/InputBase";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Avatar, Button } from "@mui/material";
import { DrawerHeader } from "./sideBarCss";
import { Main } from "./sideBarCss";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Navigate } from "react-router-dom";

import MailIcon from "@mui/icons-material/Mail";
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import {
  SearchBarTextState,
  user,
  isLoggedIn,
  authState,
} from "../../store/state_recoil";

const drawerWidth = 240;
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "50%",
  },
}));
const currentDate = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Get various components of the date
const year = currentDate.getFullYear();
const month = months[currentDate.getMonth()];
const day = currentDate.getDate();

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "150%",
    color: "black",

    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function SideBar({ children }: { children: React.ReactNode }) {
  const resetUser = useResetRecoilState(user);
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedIn);
  const User = useRecoilValue(user);
  console.log(User);
  const setText = useSetRecoilState(SearchBarTextState);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              padding: "0.3rem",
              borderRadius: "9px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon color="secondary" />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                    fontWeight: "500",
                    fontFamily: " 'Rubik' ,sans-serif",
                    letterSpacing: "-.05rem",
                  },
                }}
              >
                {day + "th "}
                {month.toLowerCase()} {year}
              </Typography>
            </div>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleChange}
            />
          </Search>
          <Link to="/user/edit/11" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                padding: ".3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                color: "white",
                borderRadius: "9px",
                backgroundColor: "error.main",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  fontFamily: " 'Rubik' ,sans-serif",
                  letterSpacing: "-.05rem",
                  color: "white",
                }}
              >
                {User.firstname}
              </Typography>
              <Avatar
                src={`http://localhost:3000/${User.image}`}
                alt="Remy Sharp"
                color="error"
                sx={{
                  width: "2rem",
                  height: "2rem",
                }}
              />
            </Box>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          borderRight: "none",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ backgroundColor: "#2b2b2b" }}>
          <Typography
            variant="h6"
            color={"error"}
            sx={{
              fontWeight: "500",
              fontFamily: " 'Rubik' ,sans-serif",
              letterSpacing: "-.05rem",
              alignSelf: "center",
              justifySelf: "center",
              marginRight: "4rem",
              backgroundcolor: "red",
            }}
          >
            TODO
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon color="secondary" />
          </IconButton>
        </DrawerHeader>

        <List
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            {[
              { display: "Home", route: "/" },
              { display: "Create", route: "/create" },
            ].map((text, index) => (
              <Link
                to={text.route}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItem
                  key={text.display}
                  sx={{
                    borderBottom: "1px solid #999999;",
                  }}
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text.display} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </div>

          <ListItem
            sx={{
              height: "40%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "none",

              borderBottom: "none",
              border: "1px solid #999999;",
              gap: "1rem",
              backgroundColor: "#2b2b2b",
              color: "white",
              borderRadius: "0 0 9px 9px",
              alignItems: "center",
              padding: "0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "0 1rem",
              }}
            >
              <Typography>
                {User.firstname} {User.lastname}
              </Typography>
              <Avatar
                alt="Remy Sharp"
                color="error"
                src={`http://localhost:3000/${User.image}`}
                sx={{
                  width: "2rem",
                  height: "2rem",
                }}
              />
            </div>

            <Button
              variant="contained"
              color="error"
              onClick={(e) => {
                e.preventDefault();
                localStorage.setItem("token", "");
                setIsLoggedIn(false);
                navigate("/landing");
                setAuth({ token: "", username: "" });
                resetUser();
              }}
            >
              Logout
            </Button>
          </ListItem>
        </List>
      </Drawer>

      <Main open={open}>
        {" "}
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
