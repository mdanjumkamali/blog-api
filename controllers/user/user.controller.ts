import { Request, Response } from "express";
import { prismaClient } from "../../client/db";

const userSelection = {
  id: true,
  name: true,
  email: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
};
export const getAuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const authorId = req.user?.id;
    if (!authorId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in." });
    }
    const user = await prismaClient.user.findUnique({
      where: {
        id: authorId,
      },
      select: userSelection,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prismaClient.user.findMany({
      select: userSelection,
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
      select: userSelection,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const authorId = req.user?.id;
    if (!authorId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in." });
    }
    const user = await prismaClient.user.findUnique({
      where: {
        id: authorId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        id: authorId,
      },
      data: {
        name,
        email,
      },
      select: userSelection,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const authorId = req.user?.id;
    if (!authorId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in." });
    }
    const user = await prismaClient.user.findUnique({
      where: {
        id: authorId,
      },
      select: userSelection,
    });

    console.log("Deleting user:", user);

    if (!user) {
      console.error(`User with ID ${authorId} not found.`);
      return res.status(404).json({ message: "User not found." });
    }

    await prismaClient.user.delete({
      where: {
        id: authorId,
      },
    });

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
