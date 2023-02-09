import { Router } from "express";
import {
  createComment,
  getCommentsByBlogId,
} from "../controllers/comment.controller.js";
import { commentsSchema } from "../middleware/validation/validation.js";
import validate from "../middleware/validation/validation.middleware.js";
import { isLoggedIn } from "../middleware/authentication/auth.middleware.js";
const commentRouter = Router();
commentRouter.post(
  "/blogs/:blog_id/comments",
  validate(commentsSchema),
  createComment
);

commentRouter.get("/blogs/:blog_id/comments", isLoggedIn, getCommentsByBlogId);
export default commentRouter;
