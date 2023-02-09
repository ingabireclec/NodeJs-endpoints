import { Schema, model } from "mongoose";

const likeSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  blog_id: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
  },
  // likeCount: { type: number },
});

const blogLike = model("blogLike", likeSchema);

export default blogLike;
