import { Router } from "express";
import { likePost, unlikePost } from "../../controllers/like/like.controller";
import { authMiddleware } from "../../middlewares/auth/auth.middleware";

const router = Router();

router.post("/:postId", authMiddleware, likePost);
router.delete("/:postId", authMiddleware, unlikePost);

export default router;
