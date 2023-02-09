import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    blog_likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogLike",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const blogModel = mongoose.model("Blog", schema);
export default blogModel;
