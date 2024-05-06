import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prismaClient } from "../../client/db";

export const Signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, avatar } = req.body;
    const validateEmail = await prismaClient.user.findUnique({
      where: { email: email },
    });
    if (validateEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatar,
      },
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prismaClient.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = Jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ message: "Login Successfully", token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("authToken");
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
