import { Request, Response } from "express";
import { prismaClient } from "../../client/db";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const authorId = req.user?.id;

    if (!authorId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in." });
    }

    const userName = await prismaClient.user.findUnique({
      where: { id: authorId },
    });

    // Create the post
    const post = await prismaClient.post.create({
      data: {
        title,
        content,
        authorId,
        authorName: userName?.name,
      },
    });

    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prismaClient.post.findMany();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const post = await prismaClient.post.findUnique({
      where: {
        id: parseInt(postId),
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    const authorId = req.user?.id;
    if (!authorId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in." });
    }
    const post = await prismaClient.post.findUnique({
      where: {
        id: parseInt(postId),
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId !== authorId) {
      return res
        .status(403)
        .json({ message: "Forbidden: You are not the author of this post." });
    }

    const updatedPost = await prismaClient.post.update({
      where: {
        id: parseInt(postId),
      },
      data: {
        title,
        content,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const authorId = req.user?.id;

    if (!authorId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in." });
    }

    const post = await prismaClient.post.findUnique({
      where: {
        id: parseInt(postId),
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId !== authorId) {
      return res
        .status(403)
        .json({ message: "Forbidden: You are not the author of this post." });
    }

    await prismaClient.post.delete({
      where: {
        id: parseInt(postId),
      },
    });

    return res.status(204).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
