import cloudinary from "../imageUpload/imageUpload.js";
import blogModel from "../models/Blogs.model.js";
import blogLike from "../models/blogLike.model.js";
const getAllBlogs = async (req, res) => {
  const blogs = await blogModel.find();
  res.json(blogs);
};

const createBlogWithImage = async (req, res) => {
  const blog = new blogModel(req.body);
  await blog.save();
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "portfolio/blogImages",
      public_id: `${blog.title}_image`,
    });
    blog.image = result.url;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not upload image",
    });
    console.log("Error while uploading image: ", error.message);
  }
};

const getBlogId = async (req, res) => {
  try {
    const blog = await blogModel.findOne({ _id: req.params.id });
    if (!blog) {
      res.status(404).json({ error: "Blog doesn't exist" });
      return;
    }
    res.send(blog);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await blogModel.findOne({ _id: req.params.id });

    if (req.body.title) {
      blog.title = req.body.title;
    }
    if (req.body.description) {
      blog.description = req.body.description;
    }
    if (req.body.category) {
      blog.category = req.body.category;
    }
    if (req.file) {
      blog.image = req.file.path;
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "portfolio/blogImages",
        public_id: `${blog.title}_image`,
      });
      blog.image = result.url;
    }
    await blog.save();
    console.log(blog);
    res.send(blog);
  } catch (err) {
    res.status(404);
    res.json({ error: "Blog doesn't exist" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const result = await blogModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Blog doesn't exist!" });
      return;
    }
    res.status(204).json({ message: "Blog deleted successfully" });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};
const toggle_like = async (req, res) => {
  blog_id = req.params.blog_id;
  blogModel.findOne({ _id: blog_id }).then((blog) => {
    if (!blog) {
      return res.status(404).json({ message: "No blog found " });
    } else {
      let current_user = req.user;
      blogLike
        .findOne({
          blog_id: blog_id,
          user_id: current_user._id,
        })
        .then(async (blog_like) => {
          if (!blog_like) {
            let blogLikeDoc = new blogLike({
              blog_id: blog_id,
              user_id: current_user._id,
            });
            let likeData = await blogLikeDoc.save();
            blogModel.updateOne(
              {
                _id: blog_id,
              },
              {
                $push: { blog_likes: likeData._id },
              }
            );
            return res.status(400).send({
              message: "like successfully added",
              data: {},
            });
          } else {
            await blogLike.deleteOne({
              _id: blog_like._id,
            });
            await blogModel.updateOne(
              {
                _id: blog_like.blog_id,
              },
              {
                $pull: { blog_likes: likeData._id },
              }
            );
            return res.status(200).send({
              message: "like successfullt removed",
              data: {},
            });
          }
        });
    }
  });
};

export {
  getAllBlogs,
  updateBlog,
  getBlogId,
  deleteBlog,
  createBlogWithImage,
  toggle_like,
};
