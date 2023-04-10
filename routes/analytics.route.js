const express = require("express");

const UserModel = require("../model/user.model");
const PostModel = require("../model/post.model");

const app = express.Router();

app.get("/users", async (req, res) => {
    try {
        const count = await UserModel.find();
        return res.status(200).send(count);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

app.get('/posts', async (req, res) => {
    try {
      const totalPosts = await PostModel.find();
      return res.status(200).send(totalPosts);;
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving total number of posts' });
    }
  });

  app.get('/posts/top-liked', async (req, res) => {
    try {
      const topLikedPosts = await PostModel.find().sort({ likes: -1 }).limit(5);
      res.status(200).json({ topLikedPosts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving top 5 most liked posts' });
    }
  });

module.exports = app;
