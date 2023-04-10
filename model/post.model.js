const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
user_id: {type: String, required: true},
content: {
type: String,
required: true,
max: 300
},
likes: {
type: Number,
default: 0
},
}, {
timestamps: true,
versionKey: false,
})

const PostModel = model("post", PostSchema);

module.exports = PostModel;