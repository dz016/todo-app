import SideBar from "../component/sideAppBAr/SideBar";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CreteType {
  title: String;
  description: String;
  done: Boolean;
}

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreteType>({
    title: "",
    description: "",
    done: false,
  });

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

    try {
      const response = await axios.post("http://localhost:3000/todo", form, {
        headers,
      });

      navigate("/");

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
          <Typography variant="h1">Create</Typography>
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
            Mark as done
          </Button>
        </Container>
      </SideBar>
    </>
  );
};

export default Create;
