import { Request, Response } from "express";
import { prismaClient } from "../../client/db";

export const likePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const authorId = req.user?.id;

    if (!authorId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in." });
    }

    const postIdNum = parseInt(postId);
    if (isNaN(postIdNum)) {
      return res.status(400).json({ message: "Invalid postId" });
    }

    const existingLike = await prismaClient.like.findFirst({
      where: {
        authorId,
        postId: postIdNum,
      },
    });

    if (existingLike) {
      return res
        .status(400)
        .json({ message: "You have already liked this post." });
    }

    const like = await prismaClient.like.create({
      data: {
        authorId,
        postId: postIdNum,
      },
    });

    return res.status(201).json(like);
  } catch (error) {
    console.error("Error liking post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const unlikePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const authorId = req.user?.id;

    if (!authorId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in." });
    }

    const postIdNum = parseInt(postId);
    if (isNaN(postIdNum)) {
      return res.status(400).json({ message: "Invalid postId" });
    }

    const like = await prismaClient.like.deleteMany({
      where: {
        authorId,
        postId: postIdNum,
      },
    });

    return res.status(200).json(like);
  } catch (error) {
    console.error("Error unliking post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
