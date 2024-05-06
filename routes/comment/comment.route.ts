import { Router } from "express";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "../../controllers/comment/comment.controller";
import { authMiddleware } from "../../middlewares/auth/auth.middleware";

const router = Router();

router.post("/:postId", authMiddleware, createComment);
router.get("/:postId", getComments);
router.put("/:commentId", authMiddleware, updateComment);
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
