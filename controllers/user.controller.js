import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

// signup

export const Signup = async (req, res) => {
  const { name, email, password, avatar } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPass,
      avatar,
    });

    res.status(200).json({ user: user, message: "Register Successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
