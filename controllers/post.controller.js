import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

// write post

export const createPost = async (req, res) => {
  const { title, content, authorId } = req.body;

  const author = await User.findById(authorId);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const newPost = await Post.create({
    title,
    content,
    author: authorId,
  });

  res.status(201).json({ message: "Post created successfully", post: newPost });
};
