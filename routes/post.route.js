const express = require("express");
const postModel = require("../model/post.model");
const app = express.Router();

app.get("/", async(req,res)=>{
    const posts = await postModel.find();
    return res.send(posts)
})

app.post('/', async (req, res) => {
    console.log(req.body)
    try {
      const { user_id } = req.body;
      const newPost = new postModel({
        user_id,
        content: req.body.content,
        likes: 0
      });
  
      await newPost.save();
  
      res.status(201).json(newPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating post' });
    }
});


app.get("/:id", async(req,res)=>{
    try{
        const post = await postModel.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).send(post)
    }catch (e) {
        return res.status(500).send(e)
    }
})

app.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const post = await postModel.findById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      post.content = req.body.content;
  
      await post.save();
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ message: 'Error updating post' });
    }
});



app.delete("/:id", async(req, res)=>{
  const id= req.params.id;
  
  try {
     await postModel.findByIdAndDelete({_id:id});
     res.send("Deleted Item");
 } catch (error) {
     console.log(error);
     res.send("Unable to delete")
 }
})

app.post('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.likes++;

    await post.save();
    res.status(200).json({ post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating post' });
  }
});

app.post('/:id/unlike', async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.likes = Math.max(0, post.likes - 1);

    await post.save();

    res.status(200).json({ post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating post' });
  }
});




module.exports = app;