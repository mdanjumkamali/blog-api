import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../../controllers/post/post.controller";
import { authMiddleware } from "../../middlewares/auth/auth.middleware";

const router = Router();

router.post("/create-post", authMiddleware, createPost);
router.get("/all-posts", getAllPosts);
router.get("/:postId", getPostById);
router.patch("/:postId", authMiddleware, updatePost);
router.delete("/:postId", authMiddleware, deletePost);

export default router;
