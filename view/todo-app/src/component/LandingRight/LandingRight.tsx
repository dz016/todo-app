import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface FormState {
  username: string;
  password: string;
}

const LandingLeft = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({ username: "", password: "" });
  const [isUser, setIsIser] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("submited");
    console.log(form);
    try {
      const response = await axios.post<{ message: string; token?: string }>(
        `http://localhost:3000/user/signup`,
        form
      );
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
      <Button
        color="success"
        onClick={() => {
          setIsIser((prev) => !prev);
        }}
      >
        {isUser ? "Don't have a Account?" : "Already have an account?"}
      </Button>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          flexDirection: "column",
          height: "10vh",
          backgroundColor: "#555",

          borderRadius: "9px",
          boxShadow: "-8px 11px 85px -31px rgba(0,0,0,0.35)",

          padding: "10rem 5rem",
        }}
      >
        <TextField
          id="input-with-icon-textfield"
          name="username"
          label="Username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
          color="success"
          size="medium"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          onChange={handleChange}
          id="input-with-icon-textfield"
          name="password"
          label="Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
          color="success"
          fullWidth
        />
      </form>
      <Button variant="contained" color="success" onClick={handleSubmit}>
        {isUser ? "Login" : "Submit"}
      </Button>
    </>
  );
};

export default LandingLeft;
