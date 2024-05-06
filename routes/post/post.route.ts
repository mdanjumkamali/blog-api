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
router.get("/:id", getPostById);
router.patch("/update-post/:id", authMiddleware, updatePost);
router.delete("/delete-post/:id", authMiddleware, deletePost);

export default router;
