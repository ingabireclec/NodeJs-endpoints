import express from "express";
import { isLoggedIn } from "../middleware/authentication/auth.middleware";
import { addLike, getLikes } from "../controllers/likeBlog.controller";

const likeRouter = express.Router();

likeRouter.post("/blogs/:id/likes", isLoggedIn, addLike);
likeRouter.get("/blogs/:id/likes", getLikes);

export default router;
