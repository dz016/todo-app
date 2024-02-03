import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user";
import todoRoutes from "./routes/todo";
const app = express();
const PORT = 3000;
console.log("dawood aziz oskayivdsf");

//mongoDb connection
mongoose.connect(
  "mongodb+srv://dawoodzargar08:Mumtaz0078@cluster1.ycgpld6.mongodb.net/todoDb"
);
//middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/user", userRoutes);
app.use("/todo", todoRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
