import { Document, model, Model, Schema } from "mongoose";

type PostType =
  | {
      title: string;
      body: string;
    }
  | Document;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Post: Model<PostType> = model<PostType>("Post", PostSchema);
