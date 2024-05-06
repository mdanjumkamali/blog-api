import { Router } from "express";
import {
  getUserById,
  updateUser,
  deleteUser,
  getUsers,
  getAuthenticatedUser,
} from "../../controllers/user/user.controller";
import { authMiddleware } from "../../middlewares/auth/auth.middleware";

const router = Router();

router.get("/authenticated-user", authMiddleware, getAuthenticatedUser);
router.get("/", getUsers);
router.get("/:userId", getUserById);
router.patch("/update-user", authMiddleware, updateUser);
router.delete("/delete-user", authMiddleware, deleteUser);

export default router;
