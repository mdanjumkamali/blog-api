import { Router } from "express";
import { Signup, Login, Logout } from "../../controllers/auth/auth.controller";
import { authMiddleware } from "../../middlewares/auth/auth.middleware";

const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);

export default router;
