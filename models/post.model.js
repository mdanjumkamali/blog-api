import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";
import { Comment } from "./comment.model.js";

const postSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Comment,
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
