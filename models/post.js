const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const postSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    uuid: { type: String, default: uuidv4() },
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const post = mongoose.model("posts", postSchema);

module.exports = { post };
