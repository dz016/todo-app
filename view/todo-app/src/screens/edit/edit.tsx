import SideBar from "../../component/sideAppBAr/SideBar";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fetchTodoState } from "../../store/state_recoil";
import { useParams, useLocation } from "react-router-dom";

interface CreteType {
  title: String;
  description: String;
  done: Boolean;
}

const Edit = () => {
  const [edit, setEdit] = useState(false);
  const location = useLocation();
  const item = location.state || {};
  const [fetchTodo, setFetchTodo] = useRecoilState(fetchTodoState);
  const navigate = useNavigate();
  const [form, setForm] = useState<CreteType>({
    title: "",
    description: "",
    done: false,
  });
  const { id } = useParams();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    console.log({ ...form, done: item.done }, item._id, id);

    try {
      const response = await axios.put(
        `http://localhost:3000/todo/${id}`,
        { ...form, done: item.done },
        {
          headers,
        }
      );

      navigate("/");
      setFetchTodo(!fetchTodo);

      console.log("Server response:", response.data);
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
  };

  return (
    <>
      <SideBar>
        <Container maxWidth="lg">
          <Typography variant="h1">Edit</Typography>
          <TextField
            name="title"
            id="outlined-controlled"
            label="Title"
            fullWidth
            color="success"
            size="medium"
            onChange={handleChange}
          />
          <div style={{ height: "1rem" }}></div>
          <TextField
            name="description"
            id="outlined-controlled"
            label="Description"
            fullWidth
            color="success"
            multiline
            rows={4}
            onChange={handleChange}
          />
          <div style={{ height: "2rem" }}></div>
          <Button variant="contained" color="success" onClick={handleClick}>
            Create
          </Button>

          <Button
            onClick={() => {
              setEdit(!edit);
            }}
            variant="contained"
            color="success"
            style={{ marginLeft: "1rem" }}
          >
            {edit ? "Edit" : "Profile"}
          </Button>
        </Container>
      </SideBar>
    </>
  );
};

export default Edit;
