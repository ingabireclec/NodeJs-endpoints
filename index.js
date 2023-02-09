import express from "express";
import mongoose from "mongoose";
import BlogRoutes from "./routes/blog.routes.js";
import queryRouter from "./routes/queries.routes.js";
import bodyParser from "body-parser";
import commentRouter from "./routes/comments.router.js";
import authenticationRoutes from "./routes/auth.routes.js";
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/api", queryRouter);
app.use("/api", BlogRoutes);
app.use("/api", authenticationRoutes);
app.use("/api", commentRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    success: true,
    message: "Welcome",
  });
});
app.listen(`${PORT}`, () => {
  console.log(`Server has started on http://localhost:${PORT} `);
});

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/andeladb", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected");
    console.log("the connection is still live");
  })
  .catch((error) => {
    console.log(error);
  });
