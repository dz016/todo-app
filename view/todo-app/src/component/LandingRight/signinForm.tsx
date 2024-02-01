import { Button } from "@mui/material";

import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";

const Signup = ({ isSignIn }: { isSignIn: boolean }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ message: string; token?: string }>(
        `http://localhost:3000/user/signup`,
        form
      );
      navigate("/todos");
      if (!response.data.token) return;
      localStorage.setItem("token", response.data.token);
      navigate("/");
      console.log("Server response:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as {
          response?: { data: { message: string } };
        };
        // Check if the server responded with an error (non-2xx status code)
        if (axiosError.response) {
          // Handle specific error messages from the server
          console.error("Server error:", axiosError.response.data.message);
        } else {
          // Handle network error or unexpected error
          console.error("Network error or unexpected error:", error.message);
        }
      } else {
        // Handle unexpected error
        console.error("Unexpected error:", error);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "10px" }}>
          <TextField
            onChange={handleChange}
            label="firstname"
            type="firstname"
            name="firstname"
            variant="outlined"
            fullWidth
            required
            size="small"
          />
          <TextField
            onChange={handleChange}
            label="lastname"
            type="lastname"
            name="lastname"
            variant="outlined"
            fullWidth
            required
            size="small"
          />
        </div>

        <div style={{ height: "0.5rem" }}></div>
        <TextField
          onChange={handleChange}
          name="username"
          label="Username"
          type="text"
          variant="outlined"
          fullWidth
          required
          size="small"
        />
        <div style={{ height: "1rem" }}></div>

        <TextField
          onChange={handleChange}
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          size="small"
        />

        <div style={{ height: "0.5rem" }}></div>
        <Button type="submit" variant="contained" color="error" fullWidth>
          {isSignIn ? "Sign In" : "Sign Up"}
        </Button>
      </form>
    </>
  );
};

export default Signup;
