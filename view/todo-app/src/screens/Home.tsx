import SideBar from "../component/sideAppBAr/SideBar";
import { Container, Typography } from "@mui/material";
import TodoCard from "../component/TodoCard/TodoCard";
import Masonry from "react-masonry-css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"; // Change here
import Grid from "@mui/material/Grid";

import Link from "@mui/material/Link";
// const useStyles = makeStyles((theme) => ({
//   footer: {
//     padding: theme.spacing(3, 2),
//     marginTop: "auto",
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//   },
//   footerLinks: {
//     listStyle: "none",
//     padding: 0,
//     "& li": {
//       display: "inline",
//       marginLeft: theme.spacing(2),
//     },
//   },
// }));

import {
  FilterTodoListState,
  TodoListState,
  authState,
  fetchTodoState,
} from "../store/state_recoil";
import { useEffect } from "react";
import axios from "axios";

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

const Home = () => {
  const [fetchTodo, setFetchTodo] = useRecoilState(fetchTodoState);
  const auth = useRecoilValue(authState);
  const setTodos = useSetRecoilState(TodoListState);

  const getTodo = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      const response = await axios.get("http://localhost:3000/todo", {
        headers,
      });
      setTodos(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as {
          response?: { data: { message: string } };
        };

        if (axiosError.response) {
          console.error("Server error:", axiosError.response.data.message);
        } else {
          console.error("Network error or unexpected error:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
    setFetchTodo(!fetchTodo);
  };

  useEffect(() => {
    if (!fetchTodo) {
      getTodo();
    }
  }, [auth.token, fetchTodo]);
  useEffect(() => {}, [auth.token]);

  // const todos = useRecoilValue(TodoListState); // Change here

  const FilteredTodos = useRecoilValue(FilterTodoListState); // Change here

  return (
    <>
      <SideBar>
        <Container maxWidth="lg">
          <Typography variant="h1">TODO</Typography>
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {FilteredTodos.map((item, index) => (
              <div key={index}>
                <TodoCard {...item} key={index} />
              </div>
            ))}
          </Masonry>
        </Container>
        <div
          style={{
            position: "fixed",
            top: "93%",
            left: "0",
            width: "100%",

            height: "7%",
            backgroundColor: "#2b2b2b",
          }}
        >
          <footer>
            <Container maxWidth="sm">
              <Grid container justifyContent="space-between">
                <Typography variant="body1">
                  &copy; 2024 Your ToDo App. All rights reserved.
                </Typography>
                <ul style={{ display: "flex" }}>
                  <li>
                    <Link href="#" color="inherit">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" color="inherit">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#" color="inherit">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </Grid>
            </Container>
          </footer>
        </div>
      </SideBar>
    </>
  );
};

export default Home;
