import path from "path";
import mongoose from "mongoose";
import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import { Post } from "./models/Post";

run();

async function run() {
  dotenv.config();

  const dbUri = process.env.DB_URI
    ? process.env.DB_URI
    : "mongodb://localhost:27017/blog";

  await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/uploads", express.static("uploads"));

  const port = process.env.PORT ? process.env.PORT : 8000;

  const imagesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/images");
    },
    filename: function (req, file, cb) {
      const parsedFileName = path.parse(file.originalname);
      cb(null, `${parsedFileName.name}-${Date.now()}${parsedFileName.ext}`);
    },
  });

  const imageUpload = multer({ storage: imagesStorage });
  app.post("/api/images", imageUpload.single("image"), async (req, res) => {
    if (req.file) {
      res.json({
        data: {
          link: req.file.path,
        },
      });
    } else {
      res.sendStatus(400);
    }
  });

  app.get("/api/posts/:id", async (req, res, next) => {
    const posts = await Post.findById(req.params.id);

    res.json({
      data: posts,
    });
  });

  app.get("/api/posts", async (req, res, next) => {
    const posts = await Post.find({});

    res.json({
      data: posts,
    });
  });

  app.post("/api/posts", async (req, res, next) => {
    const post = await new Post(req.body).save();

    res.json({
      data: post,
    });
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
