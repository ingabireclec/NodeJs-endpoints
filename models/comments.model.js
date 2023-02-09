import mongoose from "mongoose";
const commentSchema = mongoose.Schema(
  {
    commentText: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    blogId: {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;
