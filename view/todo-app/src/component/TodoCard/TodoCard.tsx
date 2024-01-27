import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const TodoCard = (item: {
  title: string;
  description: string;
  done: boolean;
  userId: string;
}) => {
  return (
    <Card
      sx={{
        minWidth: 200,
        padding: "0.5rem",
      }}
      raised
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
        <Button size="small" variant="contained" color="error">
          Delete
        </Button>
        <Button
          size="small"
          variant="contained"
          color="success"
          disabled={item.done}
        >
          Done
        </Button>
        <Button size="small" variant="contained" color="warning">
          edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default TodoCard;
