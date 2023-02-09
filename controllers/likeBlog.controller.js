import Like from "../models/blogLike.model";

// Add a like
export async function addLike(req, res) {
  try {
    const blog = await findById(req.params.id);
    blog.likes += 1;
    await blog.save();
    return res.status(200).json({ message: "Like added successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
}

// Read/count likes per post
export async function getLikes(req, res) {
  try {
    const blog = await findById(req.params.id);
    return res.status(200).json({ likes: blog.likes });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
}
