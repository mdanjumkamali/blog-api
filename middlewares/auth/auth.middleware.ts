import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { prismaClient } from "../../client/db";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.authToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    const decoded = Jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const user = await prismaClient.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
