 

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const { connection } = require("./Config/db");

const userRouter = require("./routes/user.route");
const postRouter = require("./routes/post.route");
const analyticsRouter = require("./routes/analytics.route");

const app = express();


app.use(express.json());

app.use(cors({
    origin : "*"
}))


app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

mongoose.set("strictQuery", false);

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/analytics", analyticsRouter);

app.get("/", (req,res)=> {
    res.send("Adobe Media");
})

app.listen(process.env.PORT, async()=>{
    try{
        await connection
        console.log("Connected to database")
    }
    catch(err){
        console.log(err)
        console.log("Error while connecting to DB")
    }
    console.log(`Running on port ${process.env.PORT}`)
});