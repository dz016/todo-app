import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useRecoilState } from "recoil";
import { fetchTodoState } from "../../store/state_recoil";
import { useNavigate } from "react-router-dom";

const TodoCard = (item: {
  title: string;
  description: string;
  done: boolean;
  userId: string;
  _id: string;
}) => {
  const navigate = useNavigate();
  const [fetchTodo, setFetchTodo] = useRecoilState(fetchTodoState);
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      const response = await axios.delete(
        `http://localhost:3000/todo/${item._id}`,
        { headers }
      );
      setFetchTodo(!fetchTodo);
      console.log("Server response:", response.data);
    } catch (e) {
      console.error("Error deleting item:", e);
    }
  };
  // const handleClick = () => {};
  const handleDone = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Setting up headers for the request, including authorization token
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    console.log(`http://localhost:3000/todo/${item._id}/done`);

    try {
      // Sending a POST request to mark the to-do item as done
      const response = await axios.post(
        `http://localhost:3000/todo/${item._id}/done`,
        {},
        // Sending headers in the request
        { headers }
      );

      // Updating the state to trigger a re-fetch of to-do items
      setFetchTodo(!fetchTodo);

      console.log("Server response:", response.data);
    } catch (error) {
      // Handling different types of errors that might occur during the request

      if (axios.isAxiosError(error)) {
        const axiosError = error as {
          response?: { data: { message: string } };
        };

        if (axiosError.response) {
          // Handling server errors with a specific message
          console.error("Server error:", axiosError.response.data.message);
        } else {
          // Handling network or unexpected errors
          console.error("Network error or unexpected error:", error.message);
        }
      } else {
        // Handling any other unexpected errors
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleEdit = async () => {
    navigate(`edit/${item._id}`, { state: item });
  };
  // const handleClick = () => {};
  console.log(item._id);

  return (
    <Card
      sx={{
        minWidth: 200,
        padding: "1rem",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {item.title}
        </Typography>
        <div style={{ height: "2rem" }}></div>
        <Typography variant="h5" sx={{ mb: 1.5 }} color="text.secondary">
          Description
        </Typography>
        <Typography variant="body2">{item.description}</Typography>
      </CardContent>
      <CardActions sx={{ padding: "1rem" }}>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{
            backgroundColor: item.done ? "#aaa" : "#37b24d",
            "&:hover": {
              backgroundColor: item.done ? "#aaa" : "#37b24d",
            },
            color: item.done ? "#ccc" : "primary",
          }}
          onClick={handleDone}
        >
          Done
        </Button>

        <Button
          size="small"
          variant="contained"
          color="info"
          onClick={handleEdit}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default TodoCard;
