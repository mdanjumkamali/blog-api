import { Router } from "express";
import { Signup, Login } from "../controllers/user.controller.js";

const router = Router();

router.route("/signup").post(Signup);
router.route("/login").post(Login);

export default router;
