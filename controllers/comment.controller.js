import commentModel from "../models/comments.model.js";
import blogModel from "../models/Blogs.model.js";

const createComment = async (req, res) => {
  const blog = await blogModel.findById(req.body.blogId);
  if (!blog) {
    return res
      .status(404)
      .json({ message: "No blog found with the given id." });
  }
  const comment = new commentModel({
    commentText: req.body.commentText,
    author: req.body.author,
    blogId: req.body.blogId,
  });
  await comment.save();
  return res.json(comment);
};
const getCommentsByBlogId = async (req, res) => {
  const blog = await blogModel.findById(req.params._id);
  if (!blog) {
    return res
      .status(404)
      .json({ message: "No blog found with the given id." });
  }
  const comments = await commentModel.find({ blogId: req.params._id });
  if (!comments.length) {
    return res.status(404).json({ message: "No comments found." });
  }
  return res.json(comments);
};

export { createComment, getCommentsByBlogId };
