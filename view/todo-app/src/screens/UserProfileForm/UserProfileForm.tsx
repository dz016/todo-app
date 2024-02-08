import React, { useState, ChangeEvent, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import SideBar from "../../component/sideAppBAr/SideBar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { user } from "../../store/state_recoil";
import { useSetRecoilState } from "recoil";

import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

interface UserProfileFormData {
  firstname: string;
  lastname: string;
  username: string;
  profilepicture: File | null;
}

const UserProfileForm: React.FC = () => {
  const setUser = useSetRecoilState(user);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState<UserProfileFormData>({
    firstname: "",
    lastname: "",
    username: "",
    profilepicture: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData({
      ...formData,
      profilepicture: file || null,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("firstname", formData.firstname);
    data.append("lastname", formData.lastname);
    data.append("username", formData.username);
    data.append("profilepicture", formData.profilepicture || "");
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/user/profile",
        data,
        { headers }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  console.log(formData);

  return (
    <SideBar>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "85vh",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#222",
        }}
      >
        {edit ? (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <TextField
              label="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            <Button
              size="small"
              color="error"
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              fullWidth
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                accept="image/*" // Adjust the file types as needed
              />
            </Button>
            <br />

            <Button
              size="small"
              type="submit"
              variant="contained"
              color="error"
              fullWidth
            >
              Submit
            </Button>
          </form>
        ) : (
          <UserProfile />
        )}

        <Button
          size="small"
          onClick={() => {
            setEdit(!edit);
          }}
          variant="contained"
          color="error"
        >
          {!edit ? "Edit" : "Profile"}
        </Button>

        <br />
      </Container>
    </SideBar>
  );
};
export default UserProfileForm;

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      try {
        const response = await axios.get("http://localhost:3000/user/profile", {
          headers,
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  console.log(userData);
  console.log(`http://localhost:3000/${userData.image}`);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        alt={userData.username}
        src={`http://localhost:3000/${userData.image}`}
        sx={{ width: 120, height: 120, marginBottom: 2 }}
      />
      <Typography variant="h4" gutterBottom>
        {userData.username}
      </Typography>
      <Typography variant="body1" gutterBottom>
        First Name: {userData.firstname}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Last Name: {userData.lastname}
      </Typography>
    </div>
  );
};
