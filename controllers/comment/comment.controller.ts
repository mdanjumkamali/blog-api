import { Request, Response } from "express";
import { prismaClient } from "../../client/db";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;
    const authorId = req.user?.id;
    if (!authorId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in." });
    }
    const userName = await prismaClient.user.findUnique({
      where: { id: authorId },
    });

    const comment = await prismaClient.comment.create({
      data: {
        text,
        authorId,
        postId: parseInt(postId),
        authorName: userName?.name,
      },
    });

    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const comments = await prismaClient.comment.findMany({
      where: {
        postId: parseInt(postId),
      },
    });

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const authorId = req.user!.id;
    if (!authorId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in." });
    }

    const comment = await prismaClient.comment.update({
      where: {
        id: parseInt(commentId),
      },
      data: {
        text,
      },
    });

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const authorId = req.user!.id;
    if (!authorId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in." });
    }

    const comment = await prismaClient.comment.delete({
      where: {
        id: parseInt(commentId),
      },
    });

    return res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
