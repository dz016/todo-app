import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// TodoCard.tsx
const TodoCard = (item: {
  title: string;
  description: string;
  done: boolean;
  userId: string;
}) => {
  return (
    <Card sx={{ minWidth: 225, padding: "1rem" }} raised>
      <CardContent sx={{ width: "75%" }}>
        <Typography variant="h4" component="div" textAlign="center">
          {item.title}
        </Typography>
        <div style={{ height: "2rem" }}></div>
        <Typography variant="h5" sx={{ mb: 1.5 }} color="text.secondary">
          Description
        </Typography>
        <Typography variant="body2">{item.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="error">
          Delete
        </Button>
        <Button
          size="small"
          variant="contained"
          color="success"
          disabled={item.done}
        >
          Mark as done
        </Button>
        <Button size="small" variant="contained" color="warning">
          edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default TodoCard;
