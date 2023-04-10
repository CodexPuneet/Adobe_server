require("dotenv").config();
const express = require("express");
const UserModel = require("../model/user.model");
const app = express.Router();

app.get("/", async (req,res)=> {
     const users = await UserModel.find();
     return res.send(users);
});

app.post("/", async(req,res)=> {
    let {name, email, bio } = req.body;
    let user = await UserModel.findOne({email});
    try{
        if(user){
            return res.status(409).send("This email is already in use try with other email.");
        }else{
            let newUser = new UserModel({name, email, bio });
            await newUser.save();
            return res.status(201).send(newUser);
        }
    }catch(e){
        return res.status(500).send(e.message);
    }
});

app.get("/:id", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        return res.send(user);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

app.put("/:id", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        user.name = req.body.name || user.name;
        user.bio = req.body.bio || user.bio;
        await user.save();
        return res.send(user);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

app.delete("/:id", async(req, res)=>{
    const id= req.params.id;
    console.log(id)
    try {
       await UserModel.findByIdAndDelete({_id:id});
       res.send("Deleted Item");
   } catch (error) {
       console.log(error);
       res.send("Unable to delete")
   }
  })

module.exports = app;
